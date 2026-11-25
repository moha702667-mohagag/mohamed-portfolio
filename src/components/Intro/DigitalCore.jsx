
import { forwardRef, useEffect, useRef } from "react";
import * as THREE from "three";

/* =========================================
   CUSTOM ENERGY SHADER
========================================= */

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uPower;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vPosition;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vViewPosition);

    float fresnel = pow(
      1.0 - max(dot(normal, viewDirection), 0.0),
      2.5
    );

    float wave = sin(
      vPosition.y * 15.0 +
      uTime * 1.7 +
      sin(vPosition.x * 9.0 + uTime) * 1.5
    );

    float energy = smoothstep(-0.35, 0.85, wave)
      * (0.35 + uPower * 0.9);

    float detail = sin(
      vPosition.x * 18.0 +
      vPosition.z * 13.0 -
      uTime * 0.8
    ) * 0.5 + 0.5;

    vec3 deepBlue = vec3(0.015, 0.055, 0.16);
    vec3 electricBlue = vec3(0.025, 0.32, 0.85);
    vec3 cyan = vec3(0.12, 0.78, 1.0);

    vec3 color = mix(
      deepBlue,
      electricBlue,
      clamp(energy, 0.0, 1.0)
    );

    color = mix(
      color,
      cyan,
      fresnel * (0.35 + uPower * 0.65)
    );

    color += electricBlue * detail * 0.12 * uPower;

    float alpha = 0.45 + uPower * 0.3 + fresnel * 0.25;

    gl_FragColor = vec4(color, alpha);
  }
`;

/* =========================================
   DIGITAL CORE
========================================= */

const DigitalCore = forwardRef(function DigitalCore(_, ref) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer = null;
    let scene = null;
    let camera = null;

    let frameId = 0;
    let resizeObserver = null;
    let resizeHandler = null;

    let disposed = false;
    let cleaned = false;

    let controller = null;

    const geometries = [];
    const materials = [];

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let coreGroup;
    let core;
    let innerCore;
    let shell;
    let particles;
    let rings = [];
    let coreShaderMaterial;
    let innerMaterial;
    let shellMaterial;

    /* =====================================
       CLEANUP
    ===================================== */

    const cleanup = () => {
      if (cleaned) return;

      cleaned = true;
      disposed = true;

      cancelAnimationFrame(frameId);

      resizeObserver?.disconnect();

      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
      }

      if (ref && ref.current === controller) {
        ref.current = null;
      }

      geometries.forEach((geometry) => {
        geometry.dispose();
      });

      materials.forEach((material) => {
        material.dispose();
      });

      if (renderer) {
        renderer.dispose();

        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }
    };

    /* =====================================
       RENDER FRAME
    ===================================== */

    const renderFrame = (elapsed) => {
      if (disposed || !renderer) return;

      if (!reducedMotion) {
        coreShaderMaterial.uniforms.uTime.value = elapsed;

        coreGroup.rotation.y = elapsed * 0.12;
        coreGroup.rotation.x =
          Math.sin(elapsed * 0.2) * 0.06;

        shell.rotation.y = -elapsed * 0.09;
        shell.rotation.x = elapsed * 0.05;

        rings.forEach((ring, index) => {
          ring.rotation.z =
            elapsed * 0.025 * (index + 1);
        });

        particles.rotation.y = elapsed * 0.008;
        particles.rotation.x =
          Math.sin(elapsed * 0.08) * 0.04;

        const pulse =
          1 + Math.sin(elapsed * 1.4) * 0.015;

        core.scale.setScalar(pulse);
        innerCore.scale.setScalar(pulse * 1.04);

        camera.position.z =
          6.8 + Math.sin(elapsed * 0.25) * 0.08;

        camera.position.x =
          Math.sin(elapsed * 0.16) * 0.07;

        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    try {
      /* =====================================
         SCENE & CAMERA
      ===================================== */

      scene = new THREE.Scene();

      const getDimensions = () => ({
        width: Math.max(container.clientWidth, 1),
        height: Math.max(container.clientHeight, 1),
      });

      const { width, height } = getDimensions();

      camera = new THREE.PerspectiveCamera(
        42,
        width / height,
        0.1,
        100
      );

      camera.position.set(0, 0, 6.8);

      /* =====================================
         RENDERER
      ===================================== */

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, 1.5)
      );

      renderer.setSize(width, height);

      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.setClearColor(0x000000, 0);

      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";

      container.appendChild(renderer.domElement);

      /* =====================================
         LIGHTING
      ===================================== */

      scene.add(new THREE.AmbientLight(0x416b9e, 1.4));

      const keyLight = new THREE.PointLight(0x258bff, 35, 12);
      keyLight.position.set(3, 2, 3);
      scene.add(keyLight);

      const fillLight = new THREE.PointLight(0x735cff, 20, 10);
      fillLight.position.set(-3, -2, 2);
      scene.add(fillLight);

      const rimLight = new THREE.PointLight(0x00dfff, 30, 12);
      rimLight.position.set(0, 1, -3);
      scene.add(rimLight);

      /* =====================================
         CORE GROUP
      ===================================== */

      coreGroup = new THREE.Group();
      scene.add(coreGroup);

      // Main energy sphere
      const coreGeometry = new THREE.IcosahedronGeometry(0.88, 5);
      geometries.push(coreGeometry);

      coreShaderMaterial = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uPower: { value: 0.15 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      materials.push(coreShaderMaterial);

      core = new THREE.Mesh(coreGeometry, coreShaderMaterial);
      coreGroup.add(core);

      // Inner energy sphere
      const innerGeometry = new THREE.SphereGeometry(
        0.64,
        48,
        48
      );

      geometries.push(innerGeometry);

      innerMaterial = new THREE.MeshBasicMaterial({
        color: 0x168bff,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      materials.push(innerMaterial);

      innerCore = new THREE.Mesh(innerGeometry, innerMaterial);
      coreGroup.add(innerCore);

      // Wireframe shell
      const shellGeometry = new THREE.IcosahedronGeometry(1.02, 2);
      geometries.push(shellGeometry);

      shellMaterial = new THREE.MeshBasicMaterial({
        color: 0x67c7ff,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });

      materials.push(shellMaterial);

      shell = new THREE.Mesh(shellGeometry, shellMaterial);
      coreGroup.add(shell);

      /* =====================================
         ORBITAL RINGS
      ===================================== */

      const ringSettings = [
        { radius: 1.35, color: 0x35aaff, opacity: 0.8 },
        { radius: 1.62, color: 0x9275ff, opacity: 0.55 },
        { radius: 1.9, color: 0x00d9ff, opacity: 0.42 },
      ];

      const baseRingOpacities = ringSettings.map(
        (ring) => ring.opacity
      );

      rings = [];

      ringSettings.forEach((settings, index) => {
        const geometry = new THREE.TorusGeometry(
          settings.radius,
          0.006,
          8,
          160
        );

        geometries.push(geometry);

        const material = new THREE.MeshBasicMaterial({
          color: settings.color,
          transparent: true,
          opacity: settings.opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        materials.push(material);

        const ring = new THREE.Mesh(geometry, material);

        ring.rotation.x = Math.PI / 2.5 + index * 0.6;
        ring.rotation.y = index * 0.5;
        ring.rotation.z = index * 0.35;

        coreGroup.add(ring);
        rings.push(ring);
      });

      /* =====================================
         PARTICLE FIELD
      ===================================== */

      const particleCount = 1100;
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const radius = 2.2 + Math.random() * 6;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] =
          radius * Math.sin(phi) * Math.cos(theta);

        positions[i * 3 + 1] =
          radius * Math.sin(phi) * Math.sin(theta);

        positions[i * 3 + 2] =
          radius * Math.cos(phi);
      }

      const particleGeometry = new THREE.BufferGeometry();

      particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      geometries.push(particleGeometry);

      const particleMaterial = new THREE.PointsMaterial({
        color: 0x78c5ff,
        size: 0.022,
        transparent: true,
        opacity: 0.75,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      materials.push(particleMaterial);

      particles = new THREE.Points(
        particleGeometry,
        particleMaterial
      );

      scene.add(particles);

      /* =====================================
         GSAP CONTROLLER
      ===================================== */

      const powerState = {
        value: 0.15,
      };

      controller = {
        powerState,

        applyPower: () => {
          if (disposed) return;

          const power = THREE.MathUtils.clamp(
            powerState.value,
            0,
            1
          );

          coreShaderMaterial.uniforms.uPower.value = power;

          innerMaterial.opacity = 0.08 + power * 0.2;

          shellMaterial.opacity = 0.18 + power * 0.22;

          rings.forEach((ring, index) => {
            ring.material.opacity =
              baseRingOpacities[index] *
              (0.25 + power * 0.75);
          });

          const scale = 0.82 + power * 0.18;
          coreGroup.scale.setScalar(scale);
        },
      };

      controller.applyPower();

      if (ref) {
        ref.current = controller;
      }

      /* =====================================
         RESPONSIVE
      ===================================== */

      const resize = () => {
        if (disposed || !renderer) return;

        const dimensions = getDimensions();

        camera.aspect = dimensions.width / dimensions.height;
        camera.updateProjectionMatrix();

        renderer.setSize(
          dimensions.width,
          dimensions.height
        );

        if (reducedMotion) {
          renderFrame(0);
        }
      };

      if ("ResizeObserver" in window) {
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);
      } else {
        resizeHandler = resize;
        window.addEventListener("resize", resizeHandler);
      }

      /* =====================================
         ANIMATION LOOP
      ===================================== */

      const clock = new THREE.Clock();

      if (reducedMotion) {
        renderFrame(0);
      } else {
        const animate = () => {
          if (disposed) return;

          renderFrame(clock.getElapsedTime());
          frameId = requestAnimationFrame(animate);
        };

        animate();
      }
    } catch (error) {
      console.error("DigitalCore initialization failed:", error);
      cleanup();
    }

    return cleanup;
  }, [ref]);

  return (
    <div
      ref={mountRef}
      className="digital-core-canvas"
      aria-hidden="true"
    />
  );
});

export default DigitalCore;
