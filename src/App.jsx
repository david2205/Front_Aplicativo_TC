import { Outlet } from "react-router-dom"
import MyNav from "./components/MyNav"
import { Container } from "react-bootstrap"
import { UserContext } from "./context/UserContext"
import { useState, useEffect } from "react"
import { decodeToken } from "react-jwt"

function App() {
    const [user, setUser] = useState()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setUser(decodeToken(token))
        }
    }, [])

    return (
        <>
            <Container>
                <UserContext.Provider value={{ user, setUser }}>
                    <MyNav />
                    <Outlet />
                </UserContext.Provider>
            </Container>
        </>
    )
}

export default App
