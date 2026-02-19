import {useState} from "react"
import {Box} from "@mui/material"

export default function Carousel(){
    const[rotation, setRotation] = useState(0);

    const items = [
        { name: "React", image: "/react.png", docUrl: "https://react.dev/" },
        { name: "Angular", image: "/angular.png", docUrl: "https://angular.dev/" },
        { name: "Vue", image: "/vue.png", docUrl: "https://vuejs.org/guide/introduction.html" },
        { name: "Next.js", image: "/next.png", docUrl: "https://nextjs.org/docs" },
        { name: "Nuxt", image: "/nuxt.png", docUrl: "https://nuxt.com/docs/getting-started/introduction" },
        { name: "Svelte", image: "/svelte.png", docUrl: "https://svelte.dev/docs" },
    ];

    const handleMouseMove = (e) => {
        const x = e.clientX
        const width = window.innerWidth
        const percent = (x / width) * 360 
        setRotation(percent)
    }

    const step = 360 / items.length

    const normalizeAngle = (angle) => ((angle % 360) + 360) % 360;
    const signedAngle = (angle) => {
      const normalized = normalizeAngle(angle);
      return normalized > 180 ? normalized - 360 : normalized;
    };

    const centeredIndex = items.reduce(
      (closestIndex, _, index) => {
        const currentDistance = Math.abs(signedAngle(index * step + rotation));
        const bestDistance = Math.abs(signedAngle(closestIndex * step + rotation));
        return currentDistance < bestDistance ? index : closestIndex;
      },
      0
    );

    const openDocumentation = (index) => {
      const item = items[index];
      if (!item) return;
      window.open(item.docUrl, "_blank", "noopener,noreferrer");
    };

    return(
        <Box
        onMouseMove={handleMouseMove}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            openDocumentation(centeredIndex);
          }
        }}
        tabIndex={0}
        aria-label={`Carousel technologies. Appuyez sur Entrée pour ouvrir la documentation de ${items[centeredIndex].name}.`}
        sx={{
            perspective: "900px",
            width: "100%",
            height: { xs: 260, sm: 340, md: 500 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: { xs: -2, sm: -4, md: -12 },
            overflow: "hidden"
        }}>
           
           <Box sx={{ 
            width: { xs: 110, sm: 150, md: 200 },
            height: { xs: 160, sm: 220, md: 300 },
            position: "relative",
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
            transition: "transform 0.1s linear"
           }}> {items.map((item, index) => (
            
           <Box
            key={item.name}
            component="img"
            src={item.image}
            alt={`${item.name} documentation`}
            title={`${item.name} documentation`}
            onClick={() => openDocumentation(index)}
            sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: 4,
            objectFit: "cover",
            cursor: "pointer",
            opacity: index === centeredIndex ? 1 : 0.72,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
            transform: {
              xs: `rotateY(${index * step}deg) translateZ(140px)`,
              sm: `rotateY(${index * step}deg) translateZ(200px)`,
              md: `rotateY(${index * step}deg) translateZ(300px)`,
            },
           }}/>
        )
        )}</Box>
        
        </Box>
    )
}
