export const navHTML = String.raw`
<header class="site-header" data-aos="fade-down">
  <div class="container header-inner">
    <a class="brand" href="#home">AC</a>
    <nav class="main-nav">
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#skills">Skills</a>
      <a href="#contact">Contact</a>
    </nav>
    <button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="mobile-nav">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
  <div class="mobile-nav" id="mobile-nav" aria-hidden="true">
    <a href="#about">About</a>
    <a href="#projects">Projects</a>
    <a href="#skills">Skills</a>
    <a href="#contact">Contact</a>
  </div>
</header>
`;
