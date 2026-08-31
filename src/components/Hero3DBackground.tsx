import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Hero3DBackground: React.FC<{ activeIndex?: number }> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfafafa, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.4);
    mainLight.position.set(6, 12, 8);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0xe0e7ff, 0.9);
    rimLight.position.set(-8, -4, -6);
    scene.add(rimLight);

    const softFill = new THREE.PointLight(0xfff1e6, 0.6, 20);
    softFill.position.set(0, -3, 6);
    scene.add(softFill);

    // Group for all rotating products
    const floatingGroup = new THREE.Group();
    scene.add(floatingGroup);

    // Materials
    const matteBlack = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.35,
      metalness: 0.1,
    });

    const crispWhite = new THREE.MeshStandardMaterial({
      color: 0xf4f4f5,
      roughness: 0.25,
      metalness: 0.05,
    });

    const ceramicGloss = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.15,
    });

    const goldAccent = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.2,
      metalness: 0.85,
    });

    const acrylicGlass = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.85,
      thickness: 1.2,
      transparent: true,
      opacity: 0.92,
    });

    const darkAccent = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      roughness: 0.5,
      metalness: 0.2,
    });

    // 1. T-SHIRT 3D Model Group
    const tshirtGroup = new THREE.Group();
    // Torso
    const torsoGeo = new THREE.BoxGeometry(2.2, 2.8, 0.45);
    const torsoMesh = new THREE.Mesh(torsoGeo, matteBlack);
    torsoMesh.castShadow = true;
    tshirtGroup.add(torsoMesh);

    // Collar
    const collarGeo = new THREE.TorusGeometry(0.5, 0.08, 16, 32);
    const collarMesh = new THREE.Mesh(collarGeo, darkAccent);
    collarMesh.position.set(0, 1.35, 0.05);
    collarMesh.rotation.x = Math.PI / 2;
    tshirtGroup.add(collarMesh);

    // Sleeves
    const leftSleeveGeo = new THREE.CylinderGeometry(0.35, 0.4, 1.1, 24);
    const leftSleeve = new THREE.Mesh(leftSleeveGeo, matteBlack);
    leftSleeve.position.set(-1.45, 0.85, 0);
    leftSleeve.rotation.z = Math.PI / 3.8;
    tshirtGroup.add(leftSleeve);

    const rightSleeve = leftSleeve.clone();
    rightSleeve.position.set(1.45, 0.85, 0);
    rightSleeve.rotation.z = -Math.PI / 3.8;
    tshirtGroup.add(rightSleeve);

    // Front custom emblem print plate
    const printEmblemGeo = new THREE.PlaneGeometry(1.2, 0.9);
    const emblemMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });
    const printEmblem = new THREE.Mesh(printEmblemGeo, emblemMat);
    printEmblem.position.set(0, 0.35, 0.24);
    tshirtGroup.add(printEmblem);

    tshirtGroup.position.set(-4.5, 1.8, 0);
    tshirtGroup.scale.set(0.85, 0.85, 0.85);
    floatingGroup.add(tshirtGroup);

    // 2. CERAMIC MUG 3D Model Group
    const mugGroup = new THREE.Group();
    // Cup Body
    const mugGeo = new THREE.CylinderGeometry(0.9, 0.85, 2.0, 36);
    const mugMesh = new THREE.Mesh(mugGeo, ceramicGloss);
    mugMesh.castShadow = true;
    mugGroup.add(mugMesh);

    // Handle
    const handleGeo = new THREE.TorusGeometry(0.65, 0.14, 16, 32, Math.PI * 1.2);
    const handleMesh = new THREE.Mesh(handleGeo, ceramicGloss);
    handleMesh.position.set(0.95, 0, 0);
    handleMesh.rotation.z = -Math.PI / 2;
    mugGroup.add(handleMesh);

    // Interior Coffee
    const coffeeGeo = new THREE.CircleGeometry(0.82, 32);
    const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x3f2212, roughness: 0.1 });
    const coffeeMesh = new THREE.Mesh(coffeeGeo, coffeeMat);
    coffeeMesh.position.set(0, 0.85, 0);
    coffeeMesh.rotation.x = -Math.PI / 2;
    mugGroup.add(coffeeMesh);

    mugGroup.position.set(4.6, 2.2, -1);
    mugGroup.scale.set(0.9, 0.9, 0.9);
    floatingGroup.add(mugGroup);

    // 3. BASEBALL CAP 3D Model Group
    const capGroup = new THREE.Group();
    // Crown Dome
    const crownGeo = new THREE.SphereGeometry(1.1, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2);
    const crownMesh = new THREE.Mesh(crownGeo, crispWhite);
    crownMesh.castShadow = true;
    capGroup.add(crownMesh);

    // Visor / Brim
    const visorGeo = new THREE.CylinderGeometry(1.2, 1.25, 0.1, 32, 1, false, 0, Math.PI * 0.7);
    const visorMesh = new THREE.Mesh(visorGeo, matteBlack);
    visorMesh.position.set(0, 0, 0.5);
    visorMesh.rotation.x = 0.2;
    capGroup.add(visorMesh);

    // Button on top
    const buttonGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const buttonMesh = new THREE.Mesh(buttonGeo, darkAccent);
    buttonMesh.position.set(0, 1.1, 0);
    capGroup.add(buttonMesh);

    capGroup.position.set(-3.8, -2.4, 0.5);
    capGroup.scale.set(0.95, 0.95, 0.95);
    floatingGroup.add(capGroup);

    // 4. ACRYLIC KEYCHAIN 3D Model Group
    const keychainGroup = new THREE.Group();
    const tagGeo = new THREE.BoxGeometry(1.5, 2.2, 0.12);
    const tagMesh = new THREE.Mesh(tagGeo, acrylicGlass);
    keychainGroup.add(tagMesh);

    // Keyring ring
    const ringGeo = new THREE.TorusGeometry(0.38, 0.06, 16, 32);
    const ringMesh = new THREE.Mesh(ringGeo, goldAccent);
    ringMesh.position.set(0, 1.5, 0);
    keychainGroup.add(ringMesh);

    keychainGroup.position.set(4.0, -2.2, 1);
    keychainGroup.scale.set(0.9, 0.9, 0.9);
    floatingGroup.add(keychainGroup);

    // 5. GAMING DESK MAT / MOUSEPAD
    const mousepadGroup = new THREE.Group();
    const padGeo = new THREE.BoxGeometry(3.6, 1.8, 0.08);
    const padMesh = new THREE.Mesh(padGeo, matteBlack);
    mousepadGroup.add(padMesh);
    
    const padBorderGeo = new THREE.BoxGeometry(3.66, 1.86, 0.05);
    const padBorderMesh = new THREE.Mesh(padBorderGeo, darkAccent);
    mousepadGroup.add(padBorderMesh);

    mousepadGroup.position.set(0.2, -3.2, -1.5);
    mousepadGroup.rotation.x = Math.PI / 4.5;
    mousepadGroup.scale.set(0.85, 0.85, 0.85);
    floatingGroup.add(mousepadGroup);

    // 6. PHOTO FRAME 3D Model Group
    const frameGroup = new THREE.Group();
    const frameBorderGeo = new THREE.BoxGeometry(2.4, 3.0, 0.15);
    const frameBorder = new THREE.Mesh(frameBorderGeo, matteBlack);
    frameGroup.add(frameBorder);

    const frameInnerGeo = new THREE.PlaneGeometry(1.9, 2.5);
    const frameInnerMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const frameInner = new THREE.Mesh(frameInnerGeo, frameInnerMat);
    frameInner.position.set(0, 0, 0.09);
    frameGroup.add(frameInner);

    // Brass standoffs
    const standoffGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.25, 16);
    const standoff1 = new THREE.Mesh(standoffGeo, goldAccent);
    standoff1.position.set(1.0, 1.3, 0.1);
    standoff1.rotation.x = Math.PI / 2;
    frameGroup.add(standoff1);

    const standoff2 = standoff1.clone();
    standoff2.position.set(-1.0, 1.3, 0.1);
    frameGroup.add(standoff2);

    frameGroup.position.set(0, 2.6, -2);
    frameGroup.scale.set(0.75, 0.75, 0.75);
    floatingGroup.add(frameGroup);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth subtle floating oscillations
      tshirtGroup.rotation.y = Math.sin(elapsedTime * 0.7) * 0.35 + 0.2;
      tshirtGroup.rotation.x = Math.cos(elapsedTime * 0.5) * 0.15;
      tshirtGroup.position.y = 1.8 + Math.sin(elapsedTime * 1.1) * 0.25;

      mugGroup.rotation.y = elapsedTime * 0.5;
      mugGroup.rotation.z = Math.sin(elapsedTime * 0.8) * 0.1;
      mugGroup.position.y = 2.2 + Math.cos(elapsedTime * 1.3) * 0.3;

      capGroup.rotation.y = -Math.sin(elapsedTime * 0.6) * 0.4 - 0.3;
      capGroup.rotation.x = 0.35 + Math.cos(elapsedTime * 0.7) * 0.15;
      capGroup.position.y = -2.4 + Math.sin(elapsedTime * 0.9) * 0.2;

      keychainGroup.rotation.y = Math.sin(elapsedTime * 1.2) * 0.5;
      keychainGroup.rotation.z = Math.cos(elapsedTime * 0.8) * 0.2;
      keychainGroup.position.y = -2.2 + Math.sin(elapsedTime * 1.4) * 0.25;

      mousepadGroup.rotation.y = Math.sin(elapsedTime * 0.5) * 0.2;
      mousepadGroup.position.y = -3.2 + Math.cos(elapsedTime * 0.8) * 0.15;

      frameGroup.rotation.y = Math.cos(elapsedTime * 0.4) * 0.25;
      frameGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.1;
      frameGroup.position.y = 2.6 + Math.sin(elapsedTime * 0.7) * 0.2;

      // Mouse Parallax easing
      targetRotationY = mouseX * 0.25;
      targetRotationX = -mouseY * 0.25;

      floatingGroup.rotation.y += (targetRotationY - floatingGroup.rotation.y) * 0.05;
      floatingGroup.rotation.x += (targetRotationX - floatingGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isInteractive]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div ref={containerRef} className="w-full h-full opacity-90 transition-opacity duration-700" />
      {/* Subtle Apple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[#fafafa] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(250,250,250,0.7)_80%)] pointer-events-none" />
    </div>
  );
};
