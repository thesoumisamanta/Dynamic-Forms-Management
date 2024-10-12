import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";

export default function Home() {
    return (
        <Container className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-8">Dynamic Forms Application</h1>
            <div className="space-x-4">
                <Link to="/form-a">
                    <Button>Form A</Button>
                </Link>
                <Link to="/form-b">
                    <Button>Form B</Button>
                </Link>
                <Link to="/listing">
                    <Button>View Submissions</Button>
                </Link>
            </div>
        </Container>
    );
}