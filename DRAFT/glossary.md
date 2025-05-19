# Appendix G: Glossary of Terms

| Term | Definition |
|------|------------|
| **All Languages** | A special language setting in TYPO3 with the fixed value `-1` that makes content elements visible in every language. |
| **BCP 47** | Internet Best Current Practice 47, a standardized format for language tags (e.g., "en-US", "de-DE") used for identifying languages in software applications. |
| **Connected Mode** | A TYPO3 translation approach where translated content elements maintain a reference to their Default Language parent records, enabling overlay functionality and relationship tracking. |
| **Content Element** | A discrete piece of content in TYPO3, stored in the `tt_content` database table, that can be positioned and managed independently on a page. |
| **Context API** | A TYPO3 core API that provides contextual information, including current language settings via the `LanguageAspect` object. |
| **DataHandler** | A core TYPO3 class responsible for processing and persisting database operations, including translation-related operations. |
| **Default Language** | The primary language of a TYPO3 site, always assigned the fixed language ID `0`. All other languages are considered translations. |
| **Entity-Based Translation** | A translation approach (used by CMS platforms like Drupal) where all translations of content are treated as properties of a single multilingual entity rather than separate copies. |
| **Extbase** | A PHP framework within TYPO3 that provides object-oriented development patterns for extension development. |
| **Fallback** | A mechanism that determines what content to display when a translation doesn't exist in the requested language. |
| **Fallback Chain** | A configured sequence of language IDs that TYPO3 will check, in order, when content is not available in the requested language. |
| **FallbackType** | A site configuration setting in TYPO3 that defines how the system should handle content when translations are missing (options: `fallback`, `strict`, or `free`). |
| **Free Mode** | A TYPO3 translation approach where translated content elements exist independently without a connection to Default Language records. |
| **hreflang** | An HTML attribute and HTTP header used to specify the language and regional targeting of a webpage to search engines. |
| **Internationalization (i18n)** | The process of designing software to support multiple languages and regions without engineering changes. |
| **ISO 639** | The international standard for language codes (e.g., "en" for English, "de" for German). |
| **L10N Manager** | An extension for TYPO3 that facilitates the export and import of content for translation. |
| **Language Aspect** | Part of TYPO3's Context API that handles language-related information during page rendering. |
| **Language Fallback** | The process of displaying content from an alternative language when content in the requested language is unavailable. |
| **Language ID** | A numeric identifier used in TYPO3 to represent a specific language (e.g., `0` for Default Language, `1` for first additional language). |
| **Language Overlay** | The TYPO3 process where content from a translated record is applied over the Default Language record during rendering. |
| **Language Tag** | A standardized identifier for a language, often including regional variants, following formats like BCP 47 (e.g., "en-US", "de-AT"). |
| **l10n_diffsource** | A database field in TYPO3 that stores the original Default Language values used for highlighting changes in translated content. |
| **l10n_mode** | A TCA configuration option that controls how fields should be treated during translation, with options like `exclude` to prevent translation of specific fields. |
| **l10n_parent** | A database field in TYPO3 that stores the UID of the Default Language record for a translation. Also called `l18n_parent` in some tables like `tt_content`. |
| **l10n_source** | A database field in TYPO3 that stores the UID of the source record used for translation (not necessarily the Default Language record). |
| **l10n_state** | A database field in TYPO3 that stores information about which fields are synchronized with the parent record. |
| **Localization (l10n)** | The process of adapting internationalized software for a specific region or language, including translation of text and adaptation of formats. |
| **Locale** | A set of parameters that defines language, region, and formatting preferences (e.g., "en_US.UTF-8"). |
| **Localizer** | An extension for TYPO3 that automates translation workflows and integrates with translation services. |
| **Machine Translation** | The automated translation of text by computer software without human intervention. |
| **Mixed Mode** | A discouraged state in TYPO3 where some content elements on a page are in Connected Mode while others are in Free Mode. |
| **Multilingual Entity** | A content item that maintains its identity across multiple languages, with translations treated as properties of the entity. |
| **Neural Machine Translation (NMT)** | Advanced machine translation using artificial neural networks that typically produces more natural-sounding translations. |
| **Overlay** | The process in TYPO3 where translated field values are applied over the original record during content rendering. |
| **Page Module** | The primary backend module in TYPO3 for managing page content, including its translations. |
| **PageRepository** | A core TYPO3 class responsible for retrieving page records and handling language overlays. |
| **Record** | A database entry in TYPO3, such as a page, content element, or custom extension data. |
| **RTL (Right-to-Left)** | Languages that are written from right to left, such as Arabic and Hebrew, requiring special interface considerations. |
| **Site Configuration** | YAML-based configuration in TYPO3 that defines site-specific settings, including available languages and their properties. |
| **sys_language_uid** | The database field that stores the language ID for translated records in TYPO3. |
| **TCA (Table Configuration Array)** | TYPO3's configuration array that defines how database tables and fields should be handled in the backend. |
| **Translation Memory (TM)** | A database that stores previously translated segments to improve consistency and efficiency in future translations. |
| **Translation Management System (TMS)** | Software that manages the translation process, including workflow, assignment, and integration with translation services. |
| **Translation Mode** | In TYPO3, refers to how content is translated - either "Connected" (with reference to Default Language) or "Free" (independent). |
| **Translation Service** | A professional service or API that provides translation capabilities, either through human translators or machine translation. |
| **Translation Workflow** | The process and steps involved in translating content, including creation, translation, review, and publication. |
| **Typo3DbQueryParser** | An Extbase component responsible for converting object queries into SQL, including handling of language conditions. |
| **TypoScript** | A configuration language specific to TYPO3 used to define rendering and processing instructions. |
| **XLIFF (XML Localization Interchange File Format)** | An XML-based format for standardized exchange of localizable data, used by TYPO3 for translatable labels. |
| **YAML** | A human-readable data serialization format used for TYPO3 site configurations, including language settings. |

---

_This content was generated with assistance from Claude AI._