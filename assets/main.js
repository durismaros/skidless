/* skidless — theme toggle, "no ___" typewriter and share button. */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /* ---------- Theme toggle ---------- */

  function initThemeToggle() {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;

    const root = document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

    button.addEventListener('click', () => {
      const current = root.dataset.theme || (systemDark.matches ? 'dark' : 'light');
      const next = current === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch {
        // Storage can be blocked (private mode); the toggle still works for this visit.
      }
    });
  }

  /* ---------- "no ___" typewriter ---------- */

  const PHRASES = ['skid', '“nice ip”', '“ddos u”', '“hacked u”', '“found u”'];
  const TIMING = {
    firstDelay: 2200, // before the first change
    hold: 2600,       // how long a struck phrase stays on screen
    unstrike: 220,
    pause: 250,
    restrike: 150,
    eraseStep: 35,
    typeStep: 70,
    typeJitter: 50,
  };
  const ZERO_WIDTH_SPACE = '​'; // keeps the line height while the phrase is empty

  function initTypewriter() {
    const phrase = document.getElementById('phrase');
    if (!phrase || prefersReducedMotion) return;

    const strike = phrase.parentElement;

    async function type(text) {
      for (let i = 1; i <= text.length; i++) {
        phrase.textContent = text.slice(0, i);
        await wait(TIMING.typeStep + Math.random() * TIMING.typeJitter);
      }
    }

    async function erase() {
      let text = phrase.textContent;
      while (text.length > 0) {
        text = text.slice(0, -1);
        phrase.textContent = text || ZERO_WIDTH_SPACE;
        await wait(TIMING.eraseStep);
      }
    }

    async function run() {
      let index = 0;
      await wait(TIMING.firstDelay);
      for (;;) {
        strike.classList.add('is-clear');
        await wait(TIMING.unstrike);
        await erase();
        index = (index + 1) % PHRASES.length;
        await wait(TIMING.pause);
        await type(PHRASES[index]);
        await wait(TIMING.restrike);
        strike.classList.remove('is-clear');
        await wait(TIMING.hold);
      }
    }

    run();
  }

  /* ---------- Share button ---------- */

  async function openShareSheet(url) {
    try {
      await navigator.share({ title: document.title, url });
      return true;
    } catch (error) {
      return error.name === 'AbortError'; // closing the sheet isn't a failure
    }
  }

  // Fallback for browsers and in-app webviews that block the async Clipboard API.
  function copyWithSelection(text) {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position: fixed; top: 0; left: 0; opacity: 0;';
    document.body.append(field);
    field.select();
    try {
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      field.remove();
    }
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return copyWithSelection(text);
    }
  }

  function initShareButton() {
    const button = document.getElementById('share');
    if (!button) return;

    // Phones and tablets get the system share sheet; desktops copy the link.
    const useShareSheet = typeof navigator.share === 'function' &&
      window.matchMedia('(pointer: coarse)').matches;
    const label = useShareSheet ? 'Share' : 'Copy link';
    let resetTimer;

    function flash(message) {
      button.textContent = message;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => { button.textContent = label; }, 1600);
    }

    button.textContent = label;
    button.addEventListener('click', async () => {
      const url = location.origin + location.pathname;
      if (useShareSheet && await openShareSheet(url)) return;
      flash(await copyToClipboard(url) ? 'Copied' : 'Copy failed');
    });
  }

  initThemeToggle();
  initTypewriter();
  initShareButton();
})();
