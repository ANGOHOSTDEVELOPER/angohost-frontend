import { useEffect, useState } from 'react';
import Snowfall from 'react-snowfall'




export default function NeveComponent(){
    const [snowflakeImage, setSnowflakeImage] = useState<HTMLImageElement | null>(null);
    useEffect(() => {
        const img = new Image();
        img.src = '/public/neve_icon.svg'; 
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
          radius={[5, 25]}
          speed={[0.5,0.1]}
          wind={[0.1,0.9]}
          images={[snowflakeImage]}
          snowflakeCount={100}
          color='#fff'
         key={"neves"}
        />
      )}
        </>
    )
}