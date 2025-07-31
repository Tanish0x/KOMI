
// Split all three texts
console.log('Initializing SplitType...');
const split1 = new SplitType("#mainText", { type: "chars" });
const split2 = new SplitType("#mainText2", { type: "chars" });
const split3 = new SplitType("#mainText3", { type: "chars" });
const splitOval = new SplitType('.ovalText', { types: 'chars' });
const splitMod = new SplitType('.scroll-text', { type: 'chars' });
const splitX = new SplitType(".sec1", { types: "chars" });
const splitY = new SplitType(".sec2", { types: "chars" });
const header1Split = new SplitType(".header-1 h1", {
  type: "chars",
  charsClass: "char",
});

const titleSplits = new SplitType(".tooltip .title h2", {
  type: "lines",
  linesClass: "line",
});

const descriptionSplits = new SplitType(".tooltip .description p", {
  type: "lines",
  linesClass: "line",
});
gsap.registerPlugin(ScrollTrigger);


// Split hero texts
console.log('Splitting heroText1...');
const split4 = new SplitType("#heroText1", { type: "chars" });
console.log('heroText1 split result:', split4);

console.log('Splitting heroText2...');
const split5 = new SplitType("#heroText2", { type: "chars" });
console.log('heroText2 split result:', split5);

let model, currentRotation = 0, modelSize;
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Define the custom ease once
const myEase = CustomEase.create(
  "custom",
  "M0,0 C0.126,0.382 0.516,0.322 0.674,0.47 0.866,0.65 0.741,0.7 1,1"
);



// Reveal animation using custom easing
gsap.to(".reveal", {
  height: "100%",
  duration: 7,
  ease: myEase,
  onComplete: () => {
    // Fade out loader
    gsap.to(".loader", {
      opacity: 0,
      duration: 0.3,
      // delay: 0.2,
      delay: 0.3, // Reduced delay for loader fadeout
      onComplete: () => {
        document.querySelector(".loader").style.display = "none";

        // Fade in main content
        gsap.to(".main-content", {
          opacity: 1,
          visibility: "visible",
          duration: 0.8, // Reduced duration for faster main content appearance
          onComplete: () => {
            // Animate navbar from top
            gsap.to("nav", {
              opacity: 1,
              y: 0, // Move to original position
              duration: 0.6,
              ease: "power2.out"
            });

            // Trigger the heroText1 animation when loader completes and main content is visible
            animateHeroText();
          }
        });
      }
    });
  }
});

// Function to animate heroText1 and heroText2 with SplitType and stagger
function animateHeroText() {
  console.log('animateHeroText function called');

  // Ensure the splits have been created
  if (!split4 || !split4.chars) {
    console.warn('Split for heroText1 not found');
    console.log('split4:', split4);
    return;
  }

  if (!split5 || !split5.chars) {
    console.warn('Split for heroText2 not found');
    console.log('split5:', split5);
    return;
  }

  console.log('Both splits found, proceeding with animation');
  console.log('heroText1 chars count:', split4.chars.length);
  console.log('heroText2 chars count:', split5.chars.length);

  // Create a timeline for the hero text animations
  const heroTl = gsap.timeline();

  // Set initial state for each character in both texts
  gsap.set(split4.chars, {
    y: 100,
    opacity: 0
  });

  gsap.set(split5.chars, {
    y: 100,
    opacity: 0
  });

  // Animate heroText1 characters with stagger effect
  // Add a minimal delay before starting the animation
  heroTl.to({}, { duration: 0.2 }); // Reduced delay to 0.2 seconds before starting the animation

  heroTl.to(split4.chars, {
    y: 0,
    opacity: 1,
    stagger: {
      each: 0.05,
      from: "start",
      ease: "power2.inOut"
    },
    duration: 0.8,
    ease: "back.out(1.7)"
  });

  // Animate the .sofi button with fade-in effect
  heroTl.to('.sofi', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out"
  }, "-=0.4");

  // Add a subtle scale effect after characters appear
  heroTl.to(split4.chars, {
    // scale: 1.05,
    stagger: {
      each: 0.03,
      from: "center",
      ease: "power1.inOut"
    },
    duration: 0.4,
    ease: "power1.inOut"
  }, "-=0.3");

  // Return to normal scale
  heroTl.to(split4.chars, {
    // scale: 1,
    stagger: {
      each: 0.02,
      from: "center",
      ease: "power1.inOut"
    },
    duration: 0.3,
    ease: "power2.out"
  }, "-=0.1");

  // Animate heroText2 characters with stagger effect after heroText1 animation
  heroTl.to(split5.chars, {
    y: 0,
    opacity: 1,
    stagger: {
      each: 0.05,
      from: "start",
      ease: "power2.inOut"
    },
    duration: 0.8,
    ease: "back.out(1.7)"
  }, "-=0.2"); // Slightly overlap with the end of heroText1 animation

  // Add a subtle scale effect for heroText2
  heroTl.to(split5.chars, {
    // scale: 1.05,
    stagger: {
      each: 0.03,
      from: "center",
      ease: "power1.inOut"
    },
    duration: 0.4,
    ease: "power1.inOut"
  }, "-=0.3");

  // Return heroText2 to normal scale
  heroTl.to(split5.chars, {
    // scale: 1,
    stagger: {
      each: 0.02,
      from: "center",
      ease: "power1.inOut"
    },
    duration: 0.3,
    ease: "power2.out"
  }, "-=0.1");

  // Animate the smallHeroText to fade in after both hero texts are animated
  heroTl.to('.smallHeroText', {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: "power2.out"
  }, "-=0.2");
}

// First animation timeline
const tl = gsap.timeline({
  delay: 1,
  onComplete: playSecondAnimation
});

tl.to(split1.chars, {
  y: 0,
  opacity: 1,
  stagger: 0.08,
  duration: 0.8,
  ease: "back.out(1.7)"
}, "-=0.5")

  .to('.center-text .smallText', {
    opacity: 1,
    duration: 0.5,
    ease: "power1.out"
  }, "-=0.5")

  .to(split1.chars, {
    y: -50,
    opacity: 0,
    stagger: { each: 0.05, from: "end" },
    duration: 0.5,
    ease: "power1.in"
  }, "+=0.5")

  .to('.center-text .smallText', {
    opacity: 0,
    duration: 0.5,
    ease: "power1.in"
  }, "-=0.5");

// Second animation
function playSecondAnimation() {
  const smallText2 = document.querySelectorAll('.center-text2 .smallText2');
  const text2Exists = document.querySelector('#mainText2');

  if (!smallText2 || !text2Exists) {
    console.warn('One or more elements for second animation not found.');
    return;
  }

  const tl2 = gsap.timeline({
    onComplete: playThirdAnimation
  });

  tl2.to(split2.chars, {
    y: 0,
    opacity: 1,
    stagger: 0.08,
    duration: 0.5,
    ease: "back.out(1)"
  });

  tl2.to(smallText2, {
    opacity: 1,
    duration: 0.5,
    ease: "power1.out"
  }, "-=0.5");

  tl2.to(split2.chars, {
    y: -50,
    opacity: 0,
    stagger: { each: 0.05, from: "end" },
    duration: 0.5,
    ease: "power1.in"
  }, "+=1");

  tl2.to(smallText2, {
    opacity: 0,
    duration: 0.5,
    ease: "power1.in"
  }, "<");
}

// Third animation
function playThirdAnimation() {
  const smallText3 = document.querySelectorAll('.center-text3 .smallText3');
  const text3Exists = document.querySelector('#mainText3');

  if (!smallText3 || !text3Exists) {
    console.warn('One or more elements for third animation not found.');
    return;
  }

  const tl3 = gsap.timeline();

  tl3.to(split3.chars, {
    y: 0,
    opacity: 1,
    stagger: 0.08,
    duration: 0.8,
    ease: "back.out(1.7)"
  });

  tl3.to(smallText3, {
    opacity: 1,
    duration: 0.5,
    ease: "power1.out"
  }, "-=0.5");

  tl3.to(split3.chars, {
    y: -50,
    opacity: 0,
    stagger: { each: 0.05, from: "end" },
    duration: 0.5,
    ease: "power1.in"
  }, "+=1");

  tl3.to(smallText3, {
    opacity: 0,
    duration: 0.5,
    ease: "power1.in"
  }, "<");
}

lenis.on('scroll', (e) => {
  currentScroll = e.scroll;

});


// Replace the existing ScrollTrigger code with this enhanced implementation
gsap.registerPlugin(ScrollTrigger);

// Pin the main content and let section2 scroll over it with smooth transitions
ScrollTrigger.create({
  trigger: ".main-content",
  start: "top top", // Start pinning when the top of main-content reaches the top of viewport
  end: "bottom top", // End pinning when the bottom of main-content reaches the top of viewport
  pin: true,
  pinSpacing: false, // Prevents the extra space that would normally be added
  markers: false, // Set to true for debugging
  scrub: 1, // Smooth scrubbing with 1 second lag (adjust as needed)
  ease: "power2.inOut" // Smooth easing for the animation
});

// Enhanced ScrollTrigger for section2 with smooth transitions
ScrollTrigger.create({
  trigger: ".section2",
  start: "top bottom", // Start when the top of section2 reaches the bottom of viewport
  end: "top top", // End when the top of section2 reaches the top of viewport
  scrub: 1, // Smooth scrubbing with 1 second lag
  markers: false, // Set to true for debugging
  ease: "power3.inOut", // Even smoother easing for this section
  duration: 1.5 // Animation duration in seconds
});


// Create scroll trigger animation for oval expansion



// Optional: Add animation effects when section2 comes into view
gsap.from(".section2", {
  y: 100, // Start 100px below final position
  opacity: 0, // Start fully transparent
  duration: 1.2, // Animation duration
  ease: "power2.out", // Smooth easing
  scrollTrigger: {
    trigger: ".section2",
    start: "top bottom-=100", // Start when top of section2 is 100px from bottom of viewport
    toggleActions: "play none none reverse" // Play on enter, reverse on leave
  }
});


// Create a master timeline for section2 animations with clear stages
const section2Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: '.section2',
    start: 'top top',
    end: '+=300%', // Extended scroll range for smoother transition
    pin: true, // Pin the section during scroll
    scrub: 1, // Smoother scrubbing
    markers: false, // Set to true for debugging
    onEnter: () => {
      console.log("Entered section2");
      // Set initial states
      gsap.set('.ovalText', { opacity: 0, scale: 0.9 });
      gsap.set('.oval', { scale: 1, opacity: 1 });
    },
    onLeave: () => {
      console.log("Left section2");
      // Ensure next section is visible when leaving this section
      gsap.to('.section3', { opacity: 1, duration: 2, ease: 'power2.out' });
    }
  }
});

// Set initial state for oval, text and section3 - ensures proper initialization before animation
gsap.set('.ovalText', { opacity: 0, scale: 0.9, color: '#333' });
gsap.set('.ovalText .char', { color: '#333' });
// Make oval more visible with higher opacity and normal blend mode initially
gsap.set('.oval', { scale: 1, opacity: 1, mixBlendMode: 'normal', backgroundColor: 'rgba(18, 18, 18, 0.9)' });
gsap.set('.section3', {
  opacity: 0,
  scale: 0.95,
  // y: 20,
  mixBlendMode: 'normal'
});

// STEP 1: Initial text fade in
section2Timeline.to('.ovalText', {
  opacity: 1,
  scale: 1.05,
  duration: 0.2,
  ease: 'power1.out'
}, 0);

// STEP 2: Character-by-character text filling animation with longer stagger
// Calculate total duration: stagger * number of characters (assuming ~15 chars) + base duration
// This ensures all characters have time to fill before next animation
section2Timeline.to('.ovalText .char', {
  color: 'white',
  stagger: 0.08, // Increased stagger for longer scroll effect
  duration: 0.4, // Adjusted duration
  ease: 'power1.inOut',
  onComplete: function () {
    console.log('Character animation complete');
  }
}, 0); // Start at the beginning of the timeline

// Calculate total character animation duration: stagger * (estimated chars) + duration
// For ~50 chars with 0.08s stagger = ~4s + 0.4s base duration = ~4.4s total
const charAnimDuration = 4.4; // Estimated total duration for character animation

// STEP 3: Hold the text filled state for a moment before starting fade out
// Start this after character filling completes
section2Timeline.to('.ovalText', {
  scale: 1.05,
  opacity: 1,
  duration: 0.3,
  ease: 'none'
}, charAnimDuration); // Start after character animation completes

// STEP 4: Text fade out and zoom effect sequence - starts only after holding period
// Begin fade out - moved to position after holding period
section2Timeline.to('.ovalText', {
  scale: 1.2,
  opacity: 0.3,
  duration: 0.15,
  ease: 'power1.inOut'
}, charAnimDuration + 0.3); // Start after holding period

// Continue fade out with increased zoom
section2Timeline.to('.ovalText', {
  scale: 1.35,
  opacity: 0,
  duration: 0.15,
  ease: 'power2.inOut'
}, charAnimDuration + 0.45); // Continue sequence

// Complete fade out with final zoom effect
section2Timeline.to('.ovalText', {
  scale: 1.5,
  opacity: 0,
  duration: 0.25,
  ease: 'power4.in'
}, charAnimDuration + 0.6); // Complete sequence

// STEP 5: Expand the oval to reveal content (only after text animation completes)
// Start after text fade out completes (charAnimDuration + fade duration)
section2Timeline.to(".oval", {
  width: "100vw",
  height: "100vh",
  borderRadius: "0",
  duration: 1,
  ease: "power2.inOut",
  onUpdate: function () {
    // Dynamically adjust blend mode during animation
    if (this.progress() > 0.5) {
      gsap.set('.oval', { mixBlendMode: 'screen' });
    }
  }
}, charAnimDuration + 0.85); // Start after text fade out completes

// STEP 6: Reveal the section3 content as oval expands
section2Timeline.to(".section3", {
  opacity: 1,
  scale: 1,
  y: 0,
  duration: 1.2,
  ease: "power2.inOut",
  onUpdate: function () {
    // Dynamically adjust blend mode during animation
    if (this.progress() > 0.5) {
      gsap.set('.section3', { mixBlendMode: 'screen' });
    }
  }
}, charAnimDuration + 1.0); // Start slightly after oval begins expanding


// 4th section three js part//

// Add ScrollTrigger to pin and animate .scroll-text in .section4
ScrollTrigger.create({
  trigger: ".section4",
  start: "top top",
  end: "+=100%",
  pin: true,
  scrub: 1,
  markers: false,
  onUpdate: self => {
    const progress = self.progress;
    // Animate translateX from -28% to -100% as you scroll
    const tx = -28 - 72 * progress; // from -28% to -100%
    gsap.set(".section4 .scroll-text", { transform: `translate(${tx}%, -50%)` });
  }
});

gsap.set(splitMod.chars, {
  y: 80,
  opacity: 0,
});

gsap.set('.text', {
  opacity: 0,
});

// === TEXT ANIMATION ===
ScrollTrigger.create({
  trigger: '.section4',
  start: 'top 20%',
  end: '+=2000',
  scrub: true,
  // markers: true,
  onEnter: () => {
    gsap.to(splitMod.chars, {
      y: 0,
      opacity: 1,
      duration: 1.8,
      ease: 'power3.out',
      stagger: 0.05,
    });

    gsap.to('.text', {
      opacity: 1,
      duration: 1.5,
      ease: 'power3.out',
    });
  },

  onLeave: () => {
    gsap.to(splitMod.chars, {
      y: 80,
      opacity: 0,
      duration: 1.4,
      ease: 'power3.in',
      stagger: 0.05,
    });

    gsap.to('.text', {
      opacity: 0,
      duration: 1,
      ease: 'power3.in',
    });
  },

  onEnterBack: () => {
    gsap.to(splitMod.chars, {
      y: 0,
      opacity: 1,
      duration: 1.8,
      ease: 'power3.out',
      stagger: 0.05,
    });

    gsap.to('.text', {
      opacity: 1,
      duration: 1.5,
      ease: 'power3.out',
    });
  },

  onLeaveBack: () => {
    gsap.to(splitMod.chars, {
      y: 80,
      opacity: 0,
      duration: 1.4,
      ease: 'power3.in',
      stagger: 0.05,
    });

    gsap.to('.text', {
      opacity: 0,
      duration: 1,
      ease: 'power3.in',
    });
  },
});

// === CIRCLE ANIMATION TIMELINE ===
const modeltl = gsap.timeline({
  scrollTrigger: {
    trigger: '.section4',
    start: 'top top',
    end: '+=300%',
    scrub: true,
    // markers: true,
  }
});

modeltl.fromTo(
  ".circle-reveal-section",
  { width: "0vw", height: "0vw", borderRadius: "50%" },
  { width: "170vw", height: "170vw", ease: "power2.out", duration: 2 },
  "+=0.3" // delay to wait for text animation
);

gsap.to(".circle-reveal-section", {
  opacity: 0,
  ease: "power1.out",
  duration: 1,
  scrollTrigger: {
    trigger: ".section5",
    start: "top center", // adjust as needed
    toggleActions: "play reverse play reverse", // enables reverse on scroll-up
    // markers: true, // enable to debug positions
  },
});

ScrollTrigger.create({
  trigger: ".section5",
  start: "top top",         // when top of section5 hits top of viewport
  end: "bottom 50%",            // pin for full viewport height scroll
  pin: true,
  scrub: 2,
  onEnter: () => {
    console.log("Entered section5");
  }
});

// Animate h1 (or h2 if that's your tag)
gsap.to(".section5 h1", {
  x: "-70%",
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".section5",
    start: "top top",       // start when section5 is pinned
    end: "bottom 50%",
    scrub: 2
  }
});

gsap.to(".section5 .image", {
  scale: 0.9, // or whatever scale you want
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".section5",
    start: "top top",
    end: "bottom 50%",
    scrub: 2
  }
});

// Section7 Scroll - triggered char color animation
gsap.to(".sec1 .char", {
  color: "#000",
  stagger: 1,
  ease: "none",
  scrollTrigger: {
    trigger: ".section7",
    start: "top 20%",
    end: "bottom 60%",
    scrub: true,
    // markers: true,
  },
});
gsap.to(".sec2 .char", {
  color: "#000",
  stagger: 1,
  ease: "none",
  scrollTrigger: {
    trigger: ".section8",
    start: "top 20%",
    end: "bottom bottom",
    scrub: true,
    // markers: true,
  },
});

// Section6 theme change scroll trigger
ScrollTrigger.create({
  trigger: ".section6",
  start: "bottom 80%",
  endTrigger: ".container",
  end: "bottom 80%",
  onEnter: () => {
    gsap.to("body", {
      backgroundColor: "#000",
      color: "#fff",
      duration: 0.5,
    });
  },
  onLeave: () => {
    gsap.to("body", {
      backgroundColor: "#fff",
      color: "#000",
      duration: 0.5,
    });
  },
  onEnterBack: () => {
    gsap.to("body", {
      backgroundColor: "#000",
      color: "#fff",
      duration: 0.5,
    });
  },
  onLeaveBack: () => {
    gsap.to("body", {
      backgroundColor: "#fff",
      color: "#000",
      duration: 0.5,
    });
  },
  markers: false,
});






// Global settings object for GUI controls
// Global settings object for GUI controls
const settings = {
  gui: {
    visible: false
  },
  model: {
    rotationX: -Math.PI,
    rotationY: -Math.PI,
    rotationZ: -Math.PI,
    positionX: -2.8,
    positionY: 5,
    positionZ: 1.2,
    scale: 3.3,
    autoRotate: true,
    autoRotateSpeed: 0.7,
    continuousZRotationSpeed: 0.01,
    mathPiRotation: true,
    piRotationX: 1.03,
    piRotationY: 0,
    piRotationZ: 1
  },
  camera: {
    fov: 33,
    positionX: -19,
    positionY: 4,
    positionZ: 19,
    rotationX: 0,
    rotationY: -0.23,
    rotationZ: 0.12
  },
  material: {
    metalness: 1,
    roughness: 0.7
  },
  lights: {
    ambient: {
      color: '#ffffff',
      intensity: 8
    },
    key: {
      color: '#ffffff',
      intensity: 1.5,
      positionX: -10,
      positionY: -1,
      positionZ: -8.1,
      rotationX: 0.55,
      rotationY: 0.48,
      rotationZ: 0.15,
      piRotationX: 0.5,
      piRotationY: 0.5,
      piRotationZ: 0.5
    },
    fill: {
      color: '#ffffff',
      intensity: 2,
      positionX: 10,
      positionY: 3.1,
      positionZ: 8,
      rotationX: 0.25,
      rotationY: 0.1,
      rotationZ: 0.66,
      piRotationX: 0.5,
      piRotationY: 0.5,
      piRotationZ: 0.5
    },
    rim: {
      color: '#ffffff',
      intensity: 0.3,
      positionX: 6.1,
      positionY: 0.9,
      positionZ: 6.2,
      rotationX: 0.9,
      rotationY: 0.82,
      rotationZ: 1.02,
      piRotationX: 0.5,
      piRotationY: 0.5,
      piRotationZ: 0.5
    }
  }
};


{
  // Function to setup GUI controls
  function setupGUI(model, scene, camera, ambient, keyLight, fillLight, rimLight) {
    // Create GUI instance
    const gui = new lil.GUI();
    gui.title('3D Model Controls');
    gui.hide();
    document.body.appendChild(gui.domElement);
    gui.domElement.style.display = 'none';

    // Create a toggle button for GUI visibility
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'gui-toggle-btn';
    toggleBtn.textContent = 'Toggle GUI';
    toggleBtn.classList.add('gui-toggle-button');
    document.body.appendChild(toggleBtn);

    // toggleBtn.addEventListener('click', () => {
    //   settings.gui.visible = !settings.gui.visible;
    //   if (settings.gui.visible) {
    //     gui.domElement.style.display = 'block';
    //   } else {
    //     gui.domElement.style.display = 'none';
    //   }
    // });

    // Single main folder for all controls
    const mainFolder = gui.addFolder('All Controls');
    mainFolder.open(); // Keep it open by default

    // Model section header
    mainFolder.add({ 'Model Controls': true }, 'Model Controls').disable();

    // Basic rotation controls
    mainFolder.add(settings.model, 'rotationX', -Math.PI, Math.PI, 0.01).name('Rotation X').onChange(value => {
      model.rotation.x = value;
    });
    mainFolder.add(settings.model, 'rotationY', -Math.PI, Math.PI, 0.01).name('Rotation Y').onChange(value => {
      model.rotation.y = value;
    });
    mainFolder.add(settings.model, 'rotationZ', -Math.PI, Math.PI, 0.01).name('Rotation Z').onChange(value => {
      model.rotation.z = value;
    });

    // Basic position controls
    mainFolder.add(settings.model, 'positionX', -5, 5, 0.1).name('Position X').onChange(value => {
      model.position.x = value;
    });
    mainFolder.add(settings.model, 'positionY', -5, 5, 0.1).name('Position Y').onChange(value => {
      model.position.y = value;
    });
    mainFolder.add(settings.model, 'positionZ', -5, 5, 0.1).name('Position Z').onChange(value => {
      model.position.z = value;
    });

    // Basic scale control
    mainFolder.add(settings.model, 'scale', 0.1, 5, 0.1).name('Scale').onChange(value => {
      model.scale.set(value, value, value);
    });

    // Auto rotation controls
    mainFolder.add(settings.model, 'autoRotate').name('Enable Animation');
    mainFolder.add(settings.model, 'autoRotateSpeed', 0.1, 2, 0.1).name('Rotation Speed');

    // Math.PI-based rotation controls
    mainFolder.add({ 'Math.PI Rotation': true }, 'Math.PI Rotation').disable();
    mainFolder.add(settings.model, 'piRotationX', 0, 2, 0.01).name('X (π × value)').onChange(value => {
      model.rotation.x = value * Math.PI;
    });
    mainFolder.add(settings.model, 'piRotationY', 0, 2, 0.01).name('Y (π × value)').onChange(value => {
      model.rotation.y = value * Math.PI;
    });
    mainFolder.add(settings.model, 'piRotationZ', 0, 2, 0.01).name('Z (π × value)').onChange(value => {
      model.rotation.z = value * Math.PI;
    });

    mainFolder.add(settings.model, 'continuousZRotationSpeed', 0, 0.1, 0.001).name('Continuous Z Rotation Speed');

    // Camera section header
    mainFolder.add({ 'Camera Controls': true }, 'Camera Controls').disable();

    // Camera controls
    mainFolder.add(settings.camera, 'fov', 10, 100, 1).name('FOV').onChange(value => {
      camera.fov = value;
      camera.updateProjectionMatrix();
    });
    mainFolder.add(settings.camera, 'positionX', -50, 50, 1).name('Camera X').onChange(value => {
      camera.position.x = value;
    });
    mainFolder.add(settings.camera, 'positionY', -50, 50, 1).name('Camera Y').onChange(value => {
      camera.position.y = value;
    });
    mainFolder.add(settings.camera, 'positionZ', 1, 50, 1).name('Camera Z').onChange(value => {
      camera.position.z = value;
    });

    mainFolder.add(settings.camera, 'rotationX', -Math.PI, Math.PI, 0.01).name('Cam Rot X (π)').onChange(value => {
      camera.rotation.x = value * Math.PI;
    });
    mainFolder.add(settings.camera, 'rotationY', -Math.PI, Math.PI, 0.01).name('Cam Rot Y (π)').onChange(value => {
      camera.rotation.y = value * Math.PI;
    });
    mainFolder.add(settings.camera, 'rotationZ', -Math.PI, Math.PI, 0.01).name('Cam Rot Z (π)').onChange(value => {
      camera.rotation.z = value * Math.PI;
    });


    // Material section header
    mainFolder.add({ 'Material Controls': true }, 'Material Controls').disable();

    // Material controls
    mainFolder.add(settings.material, 'metalness', 0, 1, 0.01).name('Metalness').onChange(value => {
      model.traverse((node) => {
        if (node.isMesh && node.material) {
          node.material.metalness = value;
        }
      });
    });
    mainFolder.add(settings.material, 'roughness', 0, 1, 0.01).name('Roughness').onChange(value => {
      model.traverse((node) => {
        if (node.isMesh && node.material) {
          node.material.roughness = value;
        }
      });
    });

    // Lights section header
    mainFolder.add({ 'Light Controls': true }, 'Light Controls').disable();

    // Ambient light
    mainFolder.addColor(settings.lights.ambient, 'color').name('Ambient Color').onChange(value => {
      ambient.color.set(value);
    });
    mainFolder.add(settings.lights.ambient, 'intensity', 0, 20, 0.1).name('Ambient Intensity').onChange(value => {
      ambient.intensity = value;
    });

    // Key light
    mainFolder.addColor(settings.lights.key, 'color').name('Key Light Color').onChange(value => {
      keyLight.color.set(value);
    });
    mainFolder.add(settings.lights.key, 'intensity', 0, 10, 0.1).name('Key Light Intensity').onChange(value => {
      keyLight.intensity = value;
    });
    mainFolder.add(settings.lights.key, 'positionX', -10, 10, 0.1).name('Key Light X').onChange(value => {
      keyLight.position.x = value;
    });
    mainFolder.add(settings.lights.key, 'positionY', -10, 10, 0.1).name('Key Light Y').onChange(value => {
      keyLight.position.y = value;
    });
    mainFolder.add(settings.lights.key, 'positionZ', -10, 10, 0.1).name('Key Light Z').onChange(value => {
      keyLight.position.z = value;
    });

    // Key light rotation controls using Math.PI
    mainFolder.add(settings.lights.key, 'piRotationX', 0, 2, 0.01).name('Key Light Rot X (π)').onChange(value => {
      keyLight.rotation.x = value * Math.PI;
    });
    mainFolder.add(settings.lights.key, 'piRotationY', 0, 2, 0.01).name('Key Light Rot Y (π)').onChange(value => {
      keyLight.rotation.y = value * Math.PI;
    });
    mainFolder.add(settings.lights.key, 'piRotationZ', 0, 2, 0.01).name('Key Light Rot Z (π)').onChange(value => {
      keyLight.rotation.z = value * Math.PI;
    });

    // Fill light
    mainFolder.addColor(settings.lights.fill, 'color').name('Fill Light Color').onChange(value => {
      fillLight.color.set(value);
    });
    mainFolder.add(settings.lights.fill, 'intensity', 0, 10, 0.1).name('Fill Light Intensity').onChange(value => {
      fillLight.intensity = value;
    });
    mainFolder.add(settings.lights.fill, 'positionX', -10, 10, 0.1).name('Fill Light X').onChange(value => {
      fillLight.position.x = value;
    });
    mainFolder.add(settings.lights.fill, 'positionY', -10, 10, 0.1).name('Fill Light Y').onChange(value => {
      fillLight.position.y = value;
    });
    mainFolder.add(settings.lights.fill, 'positionZ', -10, 10, 0.1).name('Fill Light Z').onChange(value => {
      fillLight.position.z = value;
    });

    // Fill light rotation controls using Math.PI
    mainFolder.add(settings.lights.fill, 'piRotationX', 0, 2, 0.01).name('Fill Light Rot X (π)').onChange(value => {
      fillLight.rotation.x = value * Math.PI;
    });
    mainFolder.add(settings.lights.fill, 'piRotationY', 0, 2, 0.01).name('Fill Light Rot Y (π)').onChange(value => {
      fillLight.rotation.y = value * Math.PI;
    });
    mainFolder.add(settings.lights.fill, 'piRotationZ', 0, 2, 0.01).name('Fill Light Rot Z (π)').onChange(value => {
      fillLight.rotation.z = value * Math.PI;
    });

    // Rim light
    mainFolder.addColor(settings.lights.rim, 'color').name('Rim Light Color').onChange(value => {
      rimLight.color.set(value);
    });
    mainFolder.add(settings.lights.rim, 'intensity', 0, 10, 0.1).name('Rim Light Intensity').onChange(value => {
      rimLight.intensity = value;
    });
    mainFolder.add(settings.lights.rim, 'positionX', -10, 10, 0.1).name('Rim Light X').onChange(value => {
      rimLight.position.x = value;
    });
    mainFolder.add(settings.lights.rim, 'positionY', -10, 10, 0.1).name('Rim Light Y').onChange(value => {
      rimLight.position.y = value;
    });
    mainFolder.add(settings.lights.rim, 'positionZ', -10, 10, 0.1).name('Rim Light Z').onChange(value => {
      rimLight.position.z = value;
    });



    // Rim light rotation controls using Math.PI
    mainFolder.add(settings.lights.rim, 'piRotationX', 0, 2, 0.01).name('Rim Light Rot X (π)').onChange(value => {
      rimLight.rotation.x = value * Math.PI;
    });
    mainFolder.add(settings.lights.rim, 'piRotationY', 0, 2, 0.01).name('Rim Light Rot Y (π)').onChange(value => {
      rimLight.rotation.y = value * Math.PI;
    });
    mainFolder.add(settings.lights.rim, 'piRotationZ', 0, 2, 0.01).name('Rim Light Rot Z (π)').onChange(value => {
      rimLight.rotation.z = value * Math.PI;
    });

    return gui;
  }

  // === 32oz Model in Section 4 ===
  function load32ozModel() {
    const container = document.querySelector('.model-container-32oz');
    if (!container) return;

    // Remove any previous renderer
    container.innerHTML = '';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(settings.camera.fov, 1, 0.1, 100);
    camera.position.set(settings.camera.positionX, settings.camera.positionY, settings.camera.positionZ);
    camera.rotation.set(
      settings.camera.rotationX * Math.PI,
      settings.camera.rotationY * Math.PI,
      settings.camera.rotationZ * Math.PI
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    // Enable sRGB tone mapping for better color
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(settings.lights.ambient.color, settings.lights.ambient.intensity);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(settings.lights.key.color, settings.lights.key.intensity);
    keyLight.position.set(settings.lights.key.positionX, settings.lights.key.positionY, settings.lights.key.positionZ);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(settings.lights.fill.color, settings.lights.fill.intensity);
    fillLight.position.set(settings.lights.fill.positionX, settings.lights.fill.positionY, settings.lights.fill.positionZ);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(settings.lights.rim.color, settings.lights.rim.intensity);
    rimLight.position.set(settings.lights.rim.positionX, settings.lights.rim.positionY, settings.lights.rim.positionZ);
    scene.add(rimLight);

    const light = new THREE.PointLight(0xffffff, 1, 100, 2); // (color, intensity, distance, decay)
    light.position.set(10, 10, 10);
    scene.add(light);

    let model32oz;
    let modelGroup;
    const loader = new THREE.GLTFLoader();
    loader.load('./32oz-flashk.glb', (gltf) => {
      model32oz = gltf.scene;
      model32oz.traverse((node) => {
        if (node.isMesh && node.material) {
          node.material.metalness = settings.material.metalness;
          node.material.roughness = settings.material.roughness;
        }
      });
      // Create a group to hold the model for centered rotation
      modelGroup = new THREE.Group();
      modelGroup.add(model32oz);

      // Calculate bounding box to center the model
      const bbox = new THREE.Box3().setFromObject(model32oz);
      const center = bbox.getCenter(new THREE.Vector3());
      model32oz.position.sub(center);

      // Position and rotate the group
      modelGroup.position.set(settings.model.positionX, settings.model.positionY, settings.model.positionZ);
      modelGroup.rotation.set(settings.model.rotationX, settings.model.rotationY, settings.model.rotationZ);
      modelGroup.scale.set(settings.model.scale, settings.model.scale, settings.model.scale);
      scene.add(modelGroup);
      // Save initial rotation
      let previousRotation = model32oz.rotation.y;

      ScrollTrigger.create({
        trigger: ".section4",
        start: "top bottom",   // when top of section4 hits bottom of viewport
        end: "bottom top",     // when bottom of section4 hits top of viewport
        scrub: true, // ensures smooth scroll tracking
        onUpdate: (self) => {
          if (!model32oz) return;

          const progress = self.progress; // value between 0 and 1
          const targetRotation = progress * (Math.PI); // 0 to 90°

          // Optional smooth easing
          gsap.to(model32oz.rotation, {
            y: targetRotation,
            duration: 1,
            ease: "power2.out"
          });
        }
      });

      // Setup GUI after model is loaded
      const gui = setupGUI(modelGroup, scene, camera, ambient, keyLight, fillLight, rimLight);

      // Fade in
      renderer.domElement.style.opacity = 0;
      renderer.domElement.style.transition = 'opacity 1s';
      setTimeout(() => { renderer.domElement.style.opacity = 1; }, 100);
      // animate();
    });

    // Add time variable for sinusoidal animation
    let time = 0;


    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate(); // Call this once at the end


    // Responsive
    window.addEventListener('resize', () => {
      const size = Math.min(container.clientWidth, container.clientHeight);
      renderer.setSize(size, size);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    });
  }

  // Load the model when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load32ozModel);
  } else {
    load32ozModel();
  }
}
