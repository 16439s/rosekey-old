.PHONY: all
all: build_image


.PHONY: build_image
build_image:
	. neko/update/utils && \
	buildah build \
	  --no-cache \
	  --platform linux/amd64 \
	  --build-arg "VERSION=$$(version_ci)" \
	  --tag docker.io/naskya/firefish \
	  --tag registry.code.naskya.net/naskya/firefish \
	  --tag "registry.code.naskya.net/naskya/firefish:$$(version_ci | cut -d':' -f2)" \
	  .
