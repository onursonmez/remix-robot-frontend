import React from 'react';  
import { DefaultNode, Graph } from '@visx/network';  

// --- Tip Tanımları ---  
export type CustomNode = {  
  x: number;  
  y: number;  
  color?: string;  
};  

export type CustomLink = {  
  source: CustomNode;  
  target: CustomNode;  
  dashed?: boolean;  
};  

export type Theme = {  
  background: string;  
  nodeColor: string;  
  linkColor: string;  
};  

export type NetworkProps = {  
  nodes?: CustomNode[];  
  links?: CustomLink[];  
  width: number;  
  height: number;  
  theme?: Theme;  
  onNodeClick?: (node: CustomNode) => void;  
  onLinkClick?: (link: CustomLink) => void;  
};  

// --- Varsayılan Veriler ---  
const defaultNodes: CustomNode[] = [  
  { x: 10, y: 10 },  
  { x: 50, y: 10 },  
  { x: 50, y: 50, color: '#26deb0' },  
];  

const defaultLinks: CustomLink[] = [  
  { source: defaultNodes[0], target: defaultNodes[1] },  
  { source: defaultNodes[1], target: defaultNodes[2] },  
  { source: defaultNodes[2], target: defaultNodes[0], dashed: true },  
];  

const defaultTheme: Theme = {  
  background: '#272b4d',  
  nodeColor: '#fff',  
  linkColor: '#999',  
};  

// --- Ana Bileşen ---  
const GraphArea: React.FC<NetworkProps> = ({  
  nodes = defaultNodes,  
  links = defaultLinks,  
  width,  
  height,  
  theme = defaultTheme,  
  onNodeClick,  
  onLinkClick,  
}) => {  
  const graph = { nodes, links };  

  return (  
    <g>  
      {/* Arka Plan */}  
      <rect width={width} height={height} rx={14} fill={theme.background} />  
      {/* Grafik */}  
      <Graph<CustomLink, CustomNode>  
        graph={graph}  
        top={0}  
        left={0}  
        nodeComponent={({ node }) => (  
          <DefaultNode  
            fill={node.color || theme.nodeColor}  
            r={2}
            onClick={() => onNodeClick?.(node)}  
          />  
        )}  
        linkComponent={({ link }) => (  
          <line  
            x1={link.source.x}  
            y1={link.source.y}  
            x2={link.target.x}  
            y2={link.target.y}  
            strokeWidth={0.5}  
            stroke={theme.linkColor}  
            strokeOpacity={0.6}  
            strokeDasharray={link.dashed ? '8,4' : undefined}  
            onClick={() => onLinkClick?.(link)}  
          />  
        )}  
      />  
    </g>  
  );  
};  

export default GraphArea;  