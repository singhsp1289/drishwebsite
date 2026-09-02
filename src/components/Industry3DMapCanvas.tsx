import { useEffect, useRef, memo } from 'react';

interface IndustryNodePos {
  id: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  color: string;
}

interface Industry3DMapCanvasProps {
  nodes: IndustryNodePos[];
  activeNodeId: string | null;
  hoveredNodeId: string | null;
}

export const Industry3DMapCanvas = memo(function Industry3DMapCanvas({
  nodes,
  activeNodeId,
  hoveredNodeId,
}: Industry3DMapCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 1000);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 560);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Subtle soft floating particles (Light Blue & Light Orange)
    const particleCount = 45;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }> = [];

    const colors = ['#0876B9', '#38BDF8', '#E2725B', '#F08A64', '#93C5FD'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.35 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Packet flow along connection lines
    const packets: Array<{
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
      color: string;
    }> = [];

    for (let i = 0; i < nodes.length; i++) {
      packets.push({
        fromIdx: i,
        toIdx: (i + 1) % nodes.length,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.003,
        color: '#0876B9',
      });
      packets.push({
        fromIdx: i,
        toIdx: (i + 2) % nodes.length,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.0025,
        color: '#E2725B',
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle pastel cyber grid lines
      ctx.strokeStyle = 'rgba(8, 118, 185, 0.035)';
      ctx.lineWidth = 1;

      const gridSize = 48;
      const startX = (time * 4) % gridSize;
      for (let x = -gridSize + startX; x < width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Central abstract technology nexus
      const centerX = width * 0.44;
      const centerY = height * 0.5;
      const nexusRadius = Math.min(width, height) * 0.28;

      ctx.save();
      ctx.translate(centerX, centerY);

      // Outer pastel rotating orbit ring (Light Blue)
      ctx.beginPath();
      ctx.ellipse(0, 0, nexusRadius * 1.1, nexusRadius * 0.44, Math.PI / 10 + Math.sin(time * 0.2) * 0.05, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(8, 118, 185, 0.18)';
      ctx.lineWidth = 1.3;
      ctx.setLineDash([6, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Inner counter-rotating orbit ring (Light Orange)
      ctx.beginPath();
      ctx.ellipse(0, 0, nexusRadius * 0.85, nexusRadius * 0.34, -Math.PI / 8 - Math.sin(time * 0.25) * 0.05, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(226, 114, 91, 0.2)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Central ambient pastel orb
      const pulse = Math.sin(time * 2) * 8;
      const gradNexus = ctx.createRadialGradient(0, 0, 0, 0, 0, 80 + pulse);
      gradNexus.addColorStop(0, 'rgba(8, 118, 185, 0.12)');
      gradNexus.addColorStop(0.5, 'rgba(226, 114, 91, 0.06)');
      gradNexus.addColorStop(1, 'rgba(248, 250, 252, 0)');
      ctx.fillStyle = gradNexus;
      ctx.beginPath();
      ctx.arc(0, 0, 80 + pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Convert percentage coordinates to pixel coordinates
      const pixelNodes = nodes.map((n) => ({
        id: n.id,
        x: (n.x / 100) * width,
        y: (n.y / 100) * height,
        color: n.color,
      }));

      // Draw elegant glowing connection lines
      pixelNodes.forEach((nodeA, idx) => {
        const isHovered = hoveredNodeId === nodeA.id || activeNodeId === nodeA.id;

        // Line to central hub
        const gradHub = ctx.createLinearGradient(nodeA.x, nodeA.y, centerX, centerY);
        gradHub.addColorStop(0, isHovered ? 'rgba(8, 118, 185, 0.6)' : 'rgba(8, 118, 185, 0.2)');
        gradHub.addColorStop(1, isHovered ? 'rgba(226, 114, 91, 0.4)' : 'rgba(226, 114, 91, 0.15)');

        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.quadraticCurveTo(
          (nodeA.x + centerX) / 2 + Math.sin(time + idx) * 8,
          (nodeA.y + centerY) / 2 + Math.cos(time + idx) * 8,
          centerX,
          centerY
        );
        ctx.strokeStyle = gradHub;
        ctx.lineWidth = isHovered ? 2 : 1.2;
        ctx.stroke();

        // Cross-network line to neighbor
        const nodeB = pixelNodes[(idx + 1) % pixelNodes.length];
        const gradMesh = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
        gradMesh.addColorStop(0, 'rgba(8, 118, 185, 0.14)');
        gradMesh.addColorStop(1, 'rgba(226, 114, 91, 0.14)');

        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);
        ctx.strokeStyle = gradMesh;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Flowing data packets along connection paths
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const from = pixelNodes[p.fromIdx];
        const to = pixelNodes[p.toIdx];
        if (!from || !to) return;

        const curX = from.x + (to.x - from.x) * p.progress;
        const curY = from.y + (to.y - from.y) * p.progress;

        ctx.beginPath();
        ctx.arc(curX, curY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Ambient pastel drifting micro-particles
      particles.forEach((pt) => {
        pt.x += pt.vx;
        pt.y += pt.vy;

        if (pt.x < 0) pt.x = width;
        if (pt.x > width) pt.x = 0;
        if (pt.y < 0) pt.y = height;
        if (pt.y > height) pt.y = 0;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.alpha * (0.6 + Math.sin(time * 1.5 + pt.x) * 0.4);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [nodes, activeNodeId, hoveredNodeId]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
});

Industry3DMapCanvas.displayName = 'Industry3DMapCanvas';
