import React, { useState, useRef, MouseEvent, WheelEvent, ChangeEvent } from "react";
import Robot from "./Robot";
import GraphArea from './GraphArea';

const Robotx = ({ x, y, width, height, fill, rotation, id, arrowColor }) => (
  <g transform={`rotate(${rotation}, ${x + width / 2}, ${y + height / 2})`}>
    <rect x={x} y={y} width={width} height={height} fill={fill} />
    <text
      x={x + width}
      y={y + height / 2}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize="2"
      fill={arrowColor}
    >
      ➤
    </text>
    <text
      x={x + width / 2}
      y={y + height / 2}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize="2"
      fill="white"
    >
      {id}
    </text>
  </g>
);

const Map = () => {
  const initialMaps = [
    { id: "map1", viewBox: { x: 0, y: 0, width: 100, height: 100, angle: 0 } },
    { id: "map2", viewBox: { x: 0, y: 0, width: 100, height: 100, angle: 80 } },
  ];

  const robots = [
    {
      id: "PTK1350",
      x: 20,
      y: 7,
      width: 10,
      height: 6,
      fill: "blue",
      rotation: 0,
      arrowColor: "blue",
    },
    {
      id: "PTK1000",
      x: 45,
      y: 47,
      width: 10,
      height: 6,
      fill: "red",
      rotation: 180,
      arrowColor: "red",
    },
  ];

  const [maps, setMaps] = useState(initialMaps);
  const [currentMapId, setCurrentMapId] = useState("map1");
  const svgRef = useRef(null);
  const isDragging = useRef(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });

  const currentMap = maps.find((map) => map.id === currentMapId);
  const currentViewBox = currentMap?.viewBox || { x: 0, y: 0, width: 100, height: 100, angle: 0 };

  const handleWheel = (event) => {
    event.preventDefault();
    if (!svgRef.current) return;

    const zoomFactor = 0.1; // Zoom sensitivity
    const scale = event.deltaY > 0 ? 1 + zoomFactor : 1 - zoomFactor;

    // Get mouse position relative to the SVG element
    const svgRect = svgRef.current.getBoundingClientRect();
    const mouseX = event.clientX - svgRect.left;
    const mouseY = event.clientY - svgRect.top;

    // Convert mouse position to SVG coordinates
    const svgMouseX = currentViewBox.x + (mouseX / svgRect.width) * currentViewBox.width;
    const svgMouseY = currentViewBox.y + (mouseY / svgRect.height) * currentViewBox.height;

    setMaps((prevMaps) =>
      prevMaps.map((map) =>
        map.id === currentMapId
          ? {
              ...map,
              viewBox: {
                x: svgMouseX - (svgMouseX - currentViewBox.x) * scale,
                y: svgMouseY - (svgMouseY - currentViewBox.y) * scale,
                width: currentViewBox.width * scale,
                height: currentViewBox.height * scale,
                angle: currentViewBox.angle,
              },
            }
          : map
      )
    );
  };

  const handleMouseDown = (event) => {
    isDragging.current = true;
    lastMousePosition.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (event) => {
    if (!isDragging.current) return;

    const dx = event.clientX - lastMousePosition.current.x;
    const dy = event.clientY - lastMousePosition.current.y;

    setMaps((prevMaps) =>
      prevMaps.map((map) =>
        map.id === currentMapId
          ? {
              ...map,
              viewBox: {
                ...map.viewBox,
                x: map.viewBox.x - dx / 2,
                y: map.viewBox.y - dy / 2,
              },
            }
          : map
      )
    );

    lastMousePosition.current = { x: event.clientX, y: event.clientY };
  };

  const handleMapChange = (event) => {
    setCurrentMapId(event.target.value);
  };

  return (
    <div style={{ overflow: "hidden", width: "100vw", height: "100vh" }}>
      {/* Dropdown for map selection */}
      <select
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
          padding: "5px",
        }}
        value={currentMapId}
        onChange={handleMapChange}
      >
        {maps.map((map) => (
          <option key={map.id} value={map.id}>
            {map.id.toUpperCase()}
          </option>
        ))}
      </select>

      <div
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <svg
          ref={svgRef}
          className="viewport"
          viewBox={`${currentViewBox.x} ${currentViewBox.y} ${currentViewBox.width} ${currentViewBox.height}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Rectangle dynamically bound to initialMaps */}
          <g transform={`rotate(${currentViewBox.angle}, 50, 50)`}>
            <rect
              x="0"
              y="0"
              width="100"
              height="100"
              fill="lightgray"
              stroke="black"
              strokeWidth="1"
            />
          </g>

          {/* Render Robots Dynamically */}
          {robots.map((robot) => (
            <Robot key={robot.id} {...robot} />
          ))}

          {/* GraphArea Bileşeni */}  
          <g transform="translate(0, 0)">  
            <GraphArea 
                  width={100}  
                  height={100}
                  theme={{  
                    background: 'transparent',  
                    nodeColor: '#ff0',  
                    linkColor: '#0f0',  
                  }}  
                  onNodeClick={(node) => console.log('Node clicked:', node)}  
                  onLinkClick={(link) => console.log('Link clicked:', link)}  
            />  
          </g>  
        </svg>
      </div>
    </div>
  );
};

export default Map;