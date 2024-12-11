import React from "react";  

interface RobotProps {  
  x: number; // Robotun x pozisyonu  
  y: number; // Robotun y pozisyonu  
  width: number; // Robotun genişliği  
  height: number; // Robotun yüksekliği  
  fill: string; // Robotun rengi  
  rotation: number; // Robotun döndürme açısı  
  id: string; // Robotun kimliği (örneğin, "R1")  
  arrowColor: string; // Ok işaretinin rengi  
}  

const Robot: React.FC<RobotProps> = ({  
  x,  
  y,  
  width,  
  height,  
  fill,  
  rotation,  
  id,  
  arrowColor,  
}) => {  
  return (  
    <g transform={`rotate(${rotation}, ${x + width / 2}, ${y + height / 2})`}>  
      {/* Robotun gövdesi */}  
      <rect x={x} y={y} width={width} height={height} fill={fill} />  

      {/* Robotun yönünü gösteren ok */}  
      <text  
        x={x + width} // Ok işareti, robotun sağında yer alır  
        y={y + height / 2}  
        textAnchor="middle"  
        dominantBaseline="middle"  
        fontSize="2"  
        fill={arrowColor}  
      >  
        ➤  
      </text>  

      {/* Robotun kimliği */}  
      <text  
        x={x + width / 2} // Kimlik, robotun ortasında yer alır  
        y={y - 1}  
        textAnchor="middle"  
        dominantBaseline="middle"  
        fontSize="2"  
        fill={arrowColor}  
      >  
        {id}  
      </text>  
    </g>  
  );  
};  

export default Robot;  