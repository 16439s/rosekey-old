//! `SeaORM` Entity. Generated by sea-orm-codegen 0.11.3

use super::sea_orm_active_enums::MetaSensitivemediadetectionEnum;
use super::sea_orm_active_enums::MetaSensitivemediadetectionsensitivityEnum;
use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq, Default)]
#[sea_orm(table_name = "meta")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: String,
    pub name: Option<String>,
    pub description: Option<String>,
    #[sea_orm(column_name = "maintainerName")]
    pub maintainer_name: Option<String>,
    #[sea_orm(column_name = "maintainerEmail")]
    pub maintainer_email: Option<String>,
    #[sea_orm(column_name = "disableRegistration")]
    pub disable_registration: bool,
    #[sea_orm(column_name = "disableLocalTimeline")]
    pub disable_local_timeline: bool,
    #[sea_orm(column_name = "disableGlobalTimeline")]
    pub disable_global_timeline: bool,
    #[sea_orm(column_name = "useStarForReactionFallback")]
    pub use_star_for_reaction_fallback: bool,
    pub langs: Vec<String>,
    #[sea_orm(column_name = "hiddenTags")]
    pub hidden_tags: Vec<String>,
    #[sea_orm(column_name = "blockedHosts")]
    pub blocked_hosts: Vec<String>,
    #[sea_orm(column_name = "mascotImageUrl")]
    pub mascot_image_url: Option<String>,
    #[sea_orm(column_name = "bannerUrl")]
    pub banner_url: Option<String>,
    #[sea_orm(column_name = "errorImageUrl")]
    pub error_image_url: Option<String>,
    #[sea_orm(column_name = "iconUrl")]
    pub icon_url: Option<String>,
    #[sea_orm(column_name = "cacheRemoteFiles")]
    pub cache_remote_files: bool,
    #[sea_orm(column_name = "enableRecaptcha")]
    pub enable_recaptcha: bool,
    #[sea_orm(column_name = "recaptchaSiteKey")]
    pub recaptcha_site_key: Option<String>,
    #[sea_orm(column_name = "recaptchaSecretKey")]
    pub recaptcha_secret_key: Option<String>,
    #[sea_orm(column_name = "localDriveCapacityMb")]
    pub local_drive_capacity_mb: i32,
    #[sea_orm(column_name = "remoteDriveCapacityMb")]
    pub remote_drive_capacity_mb: i32,
    #[sea_orm(column_name = "summalyProxy")]
    pub summaly_proxy: Option<String>,
    #[sea_orm(column_name = "enableEmail")]
    pub enable_email: bool,
    pub email: Option<String>,
    #[sea_orm(column_name = "smtpSecure")]
    pub smtp_secure: bool,
    #[sea_orm(column_name = "smtpHost")]
    pub smtp_host: Option<String>,
    #[sea_orm(column_name = "smtpPort")]
    pub smtp_port: Option<i32>,
    #[sea_orm(column_name = "smtpUser")]
    pub smtp_user: Option<String>,
    #[sea_orm(column_name = "smtpPass")]
    pub smtp_pass: Option<String>,
    #[sea_orm(column_name = "enableServiceWorker")]
    pub enable_service_worker: bool,
    #[sea_orm(column_name = "swPublicKey")]
    pub sw_public_key: Option<String>,
    #[sea_orm(column_name = "swPrivateKey")]
    pub sw_private_key: Option<String>,
    #[sea_orm(column_name = "pinnedUsers")]
    pub pinned_users: Vec<String>,
    #[sea_orm(column_name = "ToSUrl")]
    pub to_s_url: Option<String>,
    #[sea_orm(column_name = "moreUrls", column_type = "JsonBinary")]
    pub more_urls: Json,
    #[sea_orm(column_name = "repositoryUrl")]
    pub repository_url: String,
    #[sea_orm(column_name = "feedbackUrl")]
    pub feedback_url: Option<String>,
    #[sea_orm(column_name = "useObjectStorage")]
    pub use_object_storage: bool,
    #[sea_orm(column_name = "objectStorageBucket")]
    pub object_storage_bucket: Option<String>,
    #[sea_orm(column_name = "objectStoragePrefix")]
    pub object_storage_prefix: Option<String>,
    #[sea_orm(column_name = "objectStorageBaseUrl")]
    pub object_storage_base_url: Option<String>,
    #[sea_orm(column_name = "objectStorageEndpoint")]
    pub object_storage_endpoint: Option<String>,
    #[sea_orm(column_name = "objectStorageRegion")]
    pub object_storage_region: Option<String>,
    #[sea_orm(column_name = "objectStorageAccessKey")]
    pub object_storage_access_key: Option<String>,
    #[sea_orm(column_name = "objectStorageSecretKey")]
    pub object_storage_secret_key: Option<String>,
    #[sea_orm(column_name = "objectStoragePort")]
    pub object_storage_port: Option<i32>,
    #[sea_orm(column_name = "objectStorageUseSSL")]
    pub object_storage_use_ssl: bool,
    #[sea_orm(column_name = "proxyAccountId")]
    pub proxy_account_id: Option<String>,
    #[sea_orm(column_name = "objectStorageUseProxy")]
    pub object_storage_use_proxy: bool,
    #[sea_orm(column_name = "enableHcaptcha")]
    pub enable_hcaptcha: bool,
    #[sea_orm(column_name = "hcaptchaSiteKey")]
    pub hcaptcha_site_key: Option<String>,
    #[sea_orm(column_name = "hcaptchaSecretKey")]
    pub hcaptcha_secret_key: Option<String>,
    #[sea_orm(column_name = "objectStorageSetPublicRead")]
    pub object_storage_set_public_read: bool,
    #[sea_orm(column_name = "pinnedPages")]
    pub pinned_pages: Vec<String>,
    #[sea_orm(column_name = "backgroundImageUrl")]
    pub background_image_url: Option<String>,
    #[sea_orm(column_name = "logoImageUrl")]
    pub logo_image_url: Option<String>,
    #[sea_orm(column_name = "pinnedClipId")]
    pub pinned_clip_id: Option<String>,
    #[sea_orm(column_name = "objectStorageS3ForcePathStyle")]
    pub object_storage_s3_force_path_style: bool,
    #[sea_orm(column_name = "allowedHosts")]
    pub allowed_hosts: Option<Vec<String>>,
    #[sea_orm(column_name = "secureMode")]
    pub secure_mode: Option<bool>,
    #[sea_orm(column_name = "privateMode")]
    pub private_mode: Option<bool>,
    #[sea_orm(column_name = "deeplAuthKey")]
    pub deepl_auth_key: Option<String>,
    #[sea_orm(column_name = "deeplIsPro")]
    pub deepl_is_pro: bool,
    #[sea_orm(column_name = "emailRequiredForSignup")]
    pub email_required_for_signup: bool,
    #[sea_orm(column_name = "themeColor")]
    pub theme_color: Option<String>,
    #[sea_orm(column_name = "defaultLightTheme")]
    pub default_light_theme: Option<String>,
    #[sea_orm(column_name = "defaultDarkTheme")]
    pub default_dark_theme: Option<String>,
    #[sea_orm(column_name = "sensitiveMediaDetection")]
    pub sensitive_media_detection: MetaSensitivemediadetectionEnum,
    #[sea_orm(column_name = "sensitiveMediaDetectionSensitivity")]
    pub sensitive_media_detection_sensitivity: MetaSensitivemediadetectionsensitivityEnum,
    #[sea_orm(column_name = "setSensitiveFlagAutomatically")]
    pub set_sensitive_flag_automatically: bool,
    #[sea_orm(column_name = "enableIpLogging")]
    pub enable_ip_logging: bool,
    #[sea_orm(column_name = "enableSensitiveMediaDetectionForVideos")]
    pub enable_sensitive_media_detection_for_videos: bool,
    #[sea_orm(column_name = "enableActiveEmailValidation")]
    pub enable_active_email_validation: bool,
    #[sea_orm(column_name = "customMOTD")]
    pub custom_motd: Vec<String>,
    #[sea_orm(column_name = "customSplashIcons")]
    pub custom_splash_icons: Vec<String>,
    #[sea_orm(column_name = "disableRecommendedTimeline")]
    pub disable_recommended_timeline: bool,
    #[sea_orm(column_name = "recommendedInstances")]
    pub recommended_instances: Vec<String>,
    #[sea_orm(column_name = "enableGuestTimeline")]
    pub enable_guest_timeline: bool,
    #[sea_orm(column_name = "defaultReaction")]
    pub default_reaction: String,
    #[sea_orm(column_name = "libreTranslateApiUrl")]
    pub libre_translate_api_url: Option<String>,
    #[sea_orm(column_name = "libreTranslateApiKey")]
    pub libre_translate_api_key: Option<String>,
    #[sea_orm(column_name = "silencedHosts")]
    pub silenced_hosts: Vec<String>,
    #[sea_orm(column_name = "experimentalFeatures", column_type = "JsonBinary")]
    pub experimental_features: Json,
    #[sea_orm(column_name = "enableServerMachineStats")]
    pub enable_server_machine_stats: bool,
    #[sea_orm(column_name = "enableIdenticonGeneration")]
    pub enable_identicon_generation: bool,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::user::Entity",
        from = "Column::ProxyAccountId",
        to = "super::user::Column::Id",
        on_update = "NoAction",
        on_delete = "SetNull"
    )]
    User,
}

impl Related<super::user::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::User.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
