package br.com.neki.sistemaskill.model;

public enum SkillEnum {
    JAVA("Java",
            "Linguagem de programação orientada a objetos, utilizada amplamente em sistemas corporativos e aplicações Android",
            "https://banner2.cleanpng.com/20180423/xye/kisspng-java-runtime-environment-computer-icons-java-platf-java-5ade3063b37168.579025831524510819735.jpg"),
    SPRING_BOOT("Spring Boot",
            " Framework Java para desenvolvimento de aplicações web e microserviços com configuração mínima",
            "https://banner2.cleanpng.com/20180328/ace/kisspng-spring-framework-representational-state-transfer-j-spring-5abb1a637c6711.3394662515222114275096.jpg"),
    PYTHON("Python",
            "Linguagem de programação de alto nível, dinâmica e com ampla aplicação em ciência de dados, desenvolvimento web e automação",
            "https://banner2.cleanpng.com/20181117/gha/kisspng-scalable-vector-graphics-javascript-python-logo-python-png-5bf04ce99623e3.916632641542474985615.jpg"),
    JAVASCRIPT("JavaScript",
            "Linguagem de script versátil e dominante para desenvolvimento web, executada no lado do cliente e do servidor",
            "https://banner2.cleanpng.com/20180513/eiw/kisspng-javascript-node-js-logo-computer-programming-progr-5af871b4831445.9234603315262314765369.jpg"),
    REACT("React",
            "Biblioteca JavaScript para construção de interfaces de usuário, baseada em componentes e utilizada para desenvolvimento de aplicações web e móveis",
            "https://banner2.cleanpng.com/20180405/idw/kisspng-game-react-native-javascript-android-physics-5ac6d5f4e4d2c0.2594321615229803409373.jpg"),
    NODE_JS("Node.js",
            "Ambiente de execução JavaScript no lado do servidor, orientado a eventos e não bloqueante, ideal para aplicações web escaláveis",
            "https://banner2.cleanpng.com/20180416/hie/kisspng-node-js-javascript-server-side-scripting-ruby-5ad4ed858d7c65.7456424415239038775795.jpg"),
    ANGULAR("Angular",
            "Framework baseado em TypeScript para desenvolvimento de aplicações web de página única (SPA), mantido pelo Google",
            "https://banner2.cleanpng.com/20180329/lue/kisspng-angularjs-typescript-node-js-javascript-letter-a-5abd8d10eef164.7123329715223718569787.jpg"),
    RUBY("Ruby",
            "Linguagem de programação interpretada e orientada a objetos, conhecida por sua simplicidade e produtividade, popular em desenvolvimento web",
            "https://banner2.cleanpng.com/20180404/yyq/kisspng-web-development-ruby-on-rails-computer-icons-rails-5ac4df67480951.5759315115228516872951.jpg"),
    PHP("PHP",
            "Linguagem de script do lado do servidor, amplamente usada para desenvolvimento web e integração com bancos de dados.",
            "https://banner2.cleanpng.com/20180519/ufw/kisspng-web-development-php-logo-mobile-app-development-5b00d871d389f6.2380719115267820658665.jpg"),
    C_SHARP("C#",
            "Linguagem de programação moderna, orientada a objetos, desenvolvida pela Microsoft, usada para uma variedade de aplicações .NET",
            "https://banner2.cleanpng.com/20180624/uso/kisspng-c-computer-icons-logo-5b2f8b7cd87ca9.0390539915298425568867.jpg"),
    SWIFT("Swift",
            "Linguagem de programação poderosa e intuitiva da Apple, usada para desenvolvimento de aplicações iOS, macOS, watchOS e tvOS",
            "https://banner2.cleanpng.com/20180619/wfr/kisspng-swift-apple-logo-objective-c-5b28a6c3713139.5003729715293907874637.jpg"),
    KOTLIN("Kotlin",
            "Linguagem de programação moderna, concisa e segura, interoperável com Java, amplamente usada para desenvolvimento Android",
            "https://banner2.cleanpng.com/20180701/kyj/kisspng-kotlin-android-software-development-anonymous-func-kotlin-5b395da414adb4.1743565315304861800847.jpg"),
    GO("Go", "Linguagem de programação desenvolvida pela Google, conhecida por sua simplicidade, eficiência e suporte para concorrência",
            "https://image.pngaaa.com/60/5100060-middle.png"),
    RUST("Rust",
            "Linguagem de programação focada em segurança e desempenho, ideal para sistemas de baixo nível e aplicações de alto desempenho",
            "https://w7.pngwing.com/pngs/520/391/png-transparent-rust-system-programming-language-programmer-programming-language-logo-bicycle-part-c-thumbnail.png"),
    TYPESCRIPT("TypeScript",
            "Superset de JavaScript, adiciona tipagem estática para maior escalabilidade e manutenção de aplicações JavaScript",
            "https://banner2.cleanpng.com/20180329/cgq/kisspng-microsoft-visual-studio-visual-studio-code-source-coder-5abc6e89391165.3437263615222985052338.jpg"),
    SQL("SQL",
            "Linguagem padrão para gerenciamento de bancos de dados relacionais, usada para consulta e manipulação de dados",
            "https://banner2.cleanpng.com/20171202/4a0/database-free-download-png-5a22aad4e16b56.2847272415122213969233.jpg"),
    HTML("HTML",
            "Linguagem de marcação padrão para criação de páginas na web, estrutura o conteúdo e os elementos de uma página",
            "https://banner2.cleanpng.com/20180320/rse/kisspng-html-web-design-scalable-vector-graphics-world-wid-html5-icon-hd-5ab0c85c114163.9859552115215350680707.jpg"),
    CSS("CSS", "Linguagem de estilos utilizada para definir a apresentação visual das páginas web em conjunto com HTML",
            "https://banner2.cleanpng.com/20180421/vdq/kisspng-css3-cascading-style-sheets-logo-html-markup-langu-5adbf15c141187.7175103915243636120822.jpg"),
    DOCKER("Docker",
            "Plataforma para desenvolvimento, envio e execução de aplicações em ambientes isolados chamados contêineres",
            "https://banner2.cleanpng.com/20180408/xpw/kisspng-docker-python-software-deployment-xebialabs-container-5aca273f9f27f8.6493125015231977596519.jpg"),
    KUBERNETES("Kubernetes",
            "Sistema de orquestração de contêineres open-source, automatiza a implantação, escalonamento e operação de aplicações em contêineres",
            "https://banner2.cleanpng.com/20180416/gdq/kisspng-kubernetes-docker-google-cloud-platform-logo-lxc-container-5ad44c5e675a30.2660434915238626224233.jpg");

    private final String name;
    private final String description;
    private final String imageUrl;

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    SkillEnum(String name, String description, String imageUrl) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}
