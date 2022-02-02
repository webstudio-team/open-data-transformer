import "./assets/css/buttons.css"


export default function Button({onClick, children, type, name}) {

    return(
        <button onClick={onClick} className={`button--${type}`}>
            <img src={name} alt={`${name} ikonka`}/>
            {children}
        </button>
    )
}