import { useState, useEffect } from 'react'

const useOutsideclick = () => {
    const [showResult, setShowResult] = useState(false)


    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowResult(false)
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return [
        useOutsideAlerter,
        setShowResult,
        showResult
    ]


}

export default useOutsideclick