import { useEffect, useState } from 'react';
import Snowfall from 'react-snowfall'




export default function NeveComponent(){
    const [snowflakeImage, setSnowflakeImage] = useState<HTMLImageElement | null>(null);
    useEffect(() => {
        const img = new Image();
        img.src = '/public/neve_icon.png'; 
        img.style.width="20px"
        img.style.height="20px"
        img.onload = () => {
          setSnowflakeImage(img);
        };
      }, []);


    return  (
        <>
        {snowflakeImage && (
        <Snowfall
          radius={[2, 7]}
          speed={[0.5,0.1]}
          wind={[0.1,0.9]}
          
          snowflakeCount={150}
          color='#fff'
         key={"neves"}
        />
      )}
        </>
    )
}