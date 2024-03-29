## Install dev and compilation dependencies, build files
FROM docker.io/node:21-slim as build
WORKDIR /firefish

# Install compilation dependencies
RUN apt-get update && DEBIAN_FRONTEND='noninteractive' apt-get install -y --no-install-recommends curl build-essential ca-certificates clang
RUN curl --proto '=https' --tlsv1.2 --silent --show-error --fail https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

RUN echo 'deb https://deb.debian.org/debian testing main' | tee /etc/apt/sources.list
RUN apt-get update && DEBIAN_FRONTEND='noninteractive' apt-get --target-release testing install -y --no-install-recommends mold
RUN <<EOC
  echo "[target.x86_64-unknown-linux-gnu]\nlinker = '$(which clang)'\nrustflags = ['-C', 'link-arg=--ld-path=$(which mold)']" > /root/.cargo/config
  echo "[target.aarch64-unknown-linux-gnu]\nlinker = '$(which clang)'\nrustflags = ['-C', 'link-arg=--ld-path=$(which mold)']" >> /root/.cargo/config
EOC

# Copy only the cargo dependency-related files first, to cache efficiently
COPY packages/backend/native-utils/Cargo.toml packages/backend/native-utils/Cargo.toml
COPY packages/backend/native-utils/Cargo.lock packages/backend/native-utils/Cargo.lock
COPY packages/backend/native-utils/src/lib.rs packages/backend/native-utils/src/
COPY packages/backend/native-utils/migration/Cargo.toml packages/backend/native-utils/migration/Cargo.toml
COPY packages/backend/native-utils/migration/src/lib.rs packages/backend/native-utils/migration/src/

# Install cargo dependencies
RUN cargo fetch --locked --manifest-path /firefish/packages/backend/native-utils/Cargo.toml

# Copy only the dependency-related files first, to cache efficiently
COPY package.json pnpm*.yaml ./
COPY packages/backend/package.json packages/backend/package.json
COPY packages/client/package.json packages/client/package.json
COPY packages/sw/package.json packages/sw/package.json
COPY packages/firefish-js/package.json packages/firefish-js/package.json
COPY packages/megalodon/package.json packages/megalodon/package.json
COPY packages/backend/native-utils/package.json packages/backend/native-utils/package.json
COPY packages/backend/native-utils/npm/linux-x64-musl/package.json packages/backend/native-utils/npm/linux-x64-musl/package.json
COPY packages/backend/native-utils/npm/linux-arm64-musl/package.json packages/backend/native-utils/npm/linux-arm64-musl/package.json

# Configure pnpm, and install dev mode dependencies for compilation
RUN corepack enable && corepack prepare pnpm@latest --activate && pnpm install --frozen-lockfile

# Copy in the rest of the native-utils rust files
COPY packages/backend/native-utils packages/backend/native-utils/

# Compile native-utils
RUN pnpm run --filter native-utils build

# Copy in the rest of the files to compile
COPY . ./

# Write version info
ARG VERSION
ENV VERSION=${VERSION}
RUN pnpm pkg set version="${VERSION}"

# Compile
RUN env NODE_ENV=production sh -c "pnpm run --filter '!native-utils' build && pnpm run gulp"

# Trim down the dependencies to only those for production
RUN pnpm install --prod --frozen-lockfile

## Runtime container
FROM docker.io/node:21-slim
WORKDIR /firefish

# Install runtime dependencies
RUN apt-get update && DEBIAN_FRONTEND='noninteractive' apt-get install -y --no-install-recommends zip unzip tini ffmpeg ca-certificates

RUN echo 'deb https://deb.debian.org/debian experimental main' | tee /etc/apt/sources.list
RUN apt-get update && DEBIAN_FRONTEND='noninteractive' apt-get --target-release experimental install -y --no-install-recommends libc6

COPY . ./

COPY --from=build /firefish/packages/megalodon /firefish/packages/megalodon

# Copy node modules
COPY --from=build /firefish/node_modules /firefish/node_modules
COPY --from=build /firefish/packages/backend/node_modules /firefish/packages/backend/node_modules
COPY --from=build /firefish/packages/sw/node_modules /firefish/packages/sw/node_modules
COPY --from=build /firefish/packages/client/node_modules /firefish/packages/client/node_modules
COPY --from=build /firefish/packages/firefish-js/node_modules /firefish/packages/firefish-js/node_modules

# Copy the finished compiled files
COPY --from=build /firefish/built /firefish/built
COPY --from=build /firefish/packages/backend/built /firefish/packages/backend/built
COPY --from=build /firefish/packages/backend/assets/instance.css /firefish/packages/backend/assets/instance.css
COPY --from=build /firefish/packages/backend/native-utils/built /firefish/packages/backend/native-utils/built

RUN corepack enable && corepack prepare pnpm@latest --activate
ARG VERSION
ENV VERSION=${VERSION}
RUN pnpm pkg set version="${VERSION}"

ENV NODE_ENV=production
VOLUME "/firefish/files"
ENTRYPOINT [ "/usr/bin/tini", "--" ]

CMD [ "pnpm", "run", "start:container" ]
