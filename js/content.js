const DEFAULT_CONTENT = {
  nav: {
    logo: "Softbert Nexus",
    links: ["Home", "Services", "About", "Contact"]
  },
  hero: {
    badge: "Software. Resources. Consulting.",
    title: "We Build the Future,",
    titleHighlight: "One Line at a Time.",
    subtitle: "Softbert Nexus Limited partners with companies to deliver world-class software solutions, curated developer resources, and expert consulting across the entire software development ecosystem.",
    ctaPrimary: "Explore Our Services",
    ctaSecondary: "Get in Touch"
  },
  services: {
    heading: "What We Do",
    subheading: "Three pillars. Endless possibilities.",
    items: [
      {
        icon: "code",
        title: "Software Development",
        description: "From idea to deployment, we architect and build robust, scalable software tailored to your business needs. Web apps, APIs, mobile — we handle the full stack.",
        tags: ["Web Apps", "APIs", "Mobile", "Cloud"]
      },
      {
        icon: "layers",
        title: "Client Resources",
        description: "We equip your teams with the right tools, frameworks, templates, and documentation to move faster and smarter. Think of us as your technical accelerator.",
        tags: ["Toolkits", "Documentation", "Templates", "Training"]
      },
      {
        icon: "compass",
        title: "Tech Consulting",
        description: "Navigating the software ecosystem can be complex. Our consultants help you make the right architectural, tooling, and process decisions — every step of the way.",
        tags: ["Architecture", "Strategy", "Process", "Audits"]
      }
    ]
  },
  about: {
    heading: "About Softbert Nexus",
    subheading: "More than a software company.",
    body: "Softbert Nexus Limited was founded with a single mission: to make great software accessible to every company, regardless of size. We combine deep engineering expertise with a genuine passion for problem-solving — delivering solutions that are not only functional, but truly transformative.\n\nWe work across industries, partner with teams of all sizes, and treat every project like it's our own.",
    stats: [
      { value: "50+", label: "Projects Delivered" },
      { value: "30+", label: "Happy Clients" },
      { value: "5+", label: "Years Experience" },
      { value: "3", label: "Core Services" }
    ],
    values: [
      { icon: "zap", title: "Speed", text: "We move fast without breaking things." },
      { icon: "shield", title: "Reliability", text: "Built to last, tested to perfection." },
      { icon: "users", title: "Partnership", text: "Your success is our success." }
    ]
  },
  contact: {
    heading: "Let's Build Together",
    subheading: "Have a project in mind or just want to explore options? We'd love to hear from you.",
    email: "hello@softbertnexus.com",
    phone: "+1 (555) 000-0000",
    address: "Softbert Nexus Limited, Lagos, Nigeria",
    formLabels: {
      name: "Your Name",
      email: "Email Address",
      subject: "Subject",
      message: "Message",
      submit: "Send Message"
    }
  },
  footer: {
    tagline: "Building the future of software, together.",
    copyright: "© 2024 Softbert Nexus Limited. All rights reserved."
  }
};

// Load content from localStorage or fall back to defaults
function loadContent() {
  try {
    const saved = localStorage.getItem("sn_content");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Could not load saved content, using defaults.", e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_CONTENT));
}

// Save content to localStorage
function saveContent(data) {
  localStorage.setItem("sn_content", JSON.stringify(data));
}

// Reset to defaults
function resetContent() {
  localStorage.removeItem("sn_content");
}
