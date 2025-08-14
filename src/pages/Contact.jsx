import { useState, useEffect } from "react";
import { fetchDishes } from "../lib/sanityClient";

export default function Contact() {
    const [dishes, setDishes] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        dish: "",
        message: "",
    });

    useEffect(() => {
        fetchDishes().then(data => setDishes(data));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = `Hello, I want to order:
        Name: ${formData.name}
        Phone: ${formData.phone}
        Dish: ${formData.dish}
        Message: ${formData.message}`;
        const whatsappURL = `https://wa.me/1234567890?text=${encodeURIComponent(text)}`;
        window.open(whatsappURL, "_blank");
    };

    return (
        <div className="container-fluid p-4 my-5 col-12 col-md-8 col-lg-6 mx-auto">
            <h2 className="mb-4 text-center">Order via WhatsApp</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="form-control mb-3" required />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone" className="form-control mb-3" required />
                <select name="dish" value={formData.dish} onChange={handleChange} className="form-control mb-3" required>
                    <option value="">Select a dish</option>
                    {(dishes || []).map(d => (
                        <option key={d._id} value={d.name}>
                            {d.name}
                        </option>
                    ))}
                </select>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Additional Message" className="form-control mb-3" rows={3} />
                <button type="submit" className="btn btn-success w-100">
                    Send Order via WhatsApp
                </button>
            </form>
        </div>
    );
}
