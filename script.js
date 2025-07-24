
// Split all three texts
console.log('Initializing SplitType...');
const split1 = new SplitType("#mainText", { type: "chars" });
const split2 = new SplitType("#mainText2", { type: "chars" });
const split3 = new SplitType("#mainText3", { type: "chars" });
 const splitOval = new SplitType('.ovalText', { types: 'chars' })
 gsap.registerPlugin(ScrollTrigger);


// Split hero texts
console.log('Splitting heroText1...');
const split4 = new SplitType("#heroText1", { type: "chars" });
console.log('heroText1 split result:', split4);

console.log('Splitting heroText2...');
const split5 = new SplitType("#heroText2", { type: "chars" });
console.log('heroText2 split result:', split5);


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

// Function to animate heroText1 and heroText2 with splitText and stagger
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
  heroTl.to({}, {duration: 0.2}); // Reduced delay to 0.2 seconds before starting the animation
  
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
      end: '+=200%', // Extend scroll range even more for better separation of animations
      pin: true, // Pin the section during scroll
      scrub: 1, // Smoother scrubbing
      markers: false // Set to true for debugging
    }
  });
  
  // Initial state - fade in and slight scale
  section2Timeline.to('.ovalText', {
    opacity: 1,
    scale: 1.05,
    duration: 0.2, // Shorter duration for quicker initial appearance
    ease: 'power1.out'
  }, 0)
  
  // Hold the text filled state for a longer moment before starting fade out
  // This creates a clear pause between text filling and fade out
  section2Timeline.to('.ovalText', {
    scale: 1.05, // Maintain the same scale
    opacity: 1, // Keep fully visible
    duration: 0.3, // Longer duration to create a more noticeable pause
    ease: 'none'
  }, 0.4) // Start immediately after text filling completes (at 40%)
  
  // Begin fade out effect after the extended pause
  section2Timeline.to('.ovalText', {
    scale: 1.2, // Initial zoom in effect
    opacity: 0.3, // Start fading out gradually
    duration: 0.15, // Shorter duration for first stage of fade
    ease: 'power1.inOut'
  }, 0.7) // Start at 70% of the timeline (after the pause)
  
  // Continue fade out with increased zoom
  section2Timeline.to('.ovalText', {
    scale: 1.35, // Increase zoom
    opacity: 0, // Continue fading
    duration: 0.15,
    ease: 'power2.inOut'
  }, 0.8) // Start at 80% of the timeline to ensure smooth transition to final stage
  
  // Complete fade out with final zoom effect
  section2Timeline.to('.ovalText', {
    scale: 1.5, // Final zoom level
    opacity: 0, // Fade out completely
    duration: 0.25, // Even longer duration to guarantee complete fade-out
    ease: 'power4.in' // Stronger easing for more definitive fade-out
  }, 0.85) // Start even earlier at 85% of the timeline to ensure full completion

  // Scroll fill effect (gray to white character-by-character)
  // Add to the master timeline to ensure proper synchronization
  // Complete the text filling in the first 40% of the scroll
  section2Timeline.to('.ovalText .char', {
    color: 'white',
    stagger: 0.01, // Faster stagger for quicker filling
    duration: 0.4, // Complete in first 40% of scroll
    ease: 'power1.inOut'
  }, 0) // Start at the beginning of the timeline
// 3. Expand the oval
  section2Timeline.to(".oval", {
    scale: 8, // or use width/height instead
    opacity: 0,
    pointerEvents: "none", // so it doesn't block clicks
    duration: 1.2,
    ease: "power2.inOut"
  });

  
  