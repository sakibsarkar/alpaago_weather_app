import "./Cursor.css";
import { useEffect, useState } from "react";

// CursorFollower.js



const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showCursor, setShowCursor] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX + 10, y: e.clientY });
            setShowCursor(true)
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);


    const handleMouseOut = (e) => {
        setShowCursor(false)
    };
    document.addEventListener('mouseout', handleMouseOut);
    return (
        <>
            {
                showCursor ?
                    <div style={{ transform: `translate(${position.x}px,${position.y}px)` }
                    } className="cursor" />

                    :
                    ""
            }


        </>
    )
};

export default Cursor;
