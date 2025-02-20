export const SlideRight = (delay) =>{
    return{
        hidden: {
            opacity: 0, 
            x: -100,
        },
        visible:{
            opacity: 1, 
            x: 0,
            transition: {
                duration: 1,
                delay: delay
            }
        }
    }
}

export const NavAnimation = (delay) =>({
    hidden: {
        opacity: 0,
        x: -100,
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            delay: delay
        }
    }
})