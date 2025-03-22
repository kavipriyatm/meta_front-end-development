import React from 'react';
import "./styles/ReservationsContent.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    name: yup.string().required("Full name is a required field!"),
    email: yup.string().required("Email is a required field!").email("Email is not valid!"),
    
    contactNumber: yup.string()
        .required("Contact number is a required field!")
        .matches(/^[6-9]\d{9}$/, "Contact number must be a valid 10-digit Indian mobile number!"),
    
    guests: yup.number()
        .typeError("Guests must be a number!") 
        .min(1, "There must be at least 1 guest!")
        .required("Please specify number of guests per table!"),
    
    date: yup.string().required("Please select date and time!"),
});

function Form() {

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const formSubmit = (data) => {
        console.table(data);
        alert("Reservation submitted successfully!");
    };

    return (
        <form onSubmit={handleSubmit(formSubmit)}>
            <fieldset>
                <div className="field">
                    <label htmlFor="name">Full Name</label>
                    <input 
                        type="text" 
                        placeholder="John Doe" 
                        {...register("name")} 
                    />
                    <span className="error-message">{errors.name?.message}</span>
                </div>

                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        placeholder="text@email.com" 
                        {...register("email")} 
                    />
                    <span className="error-message">{errors.email?.message}</span>
                </div>

                <div className="field">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input 
                        type="tel" 
                        placeholder="9876543210" 
                        {...register("contactNumber")} 
                    />
                    <span className="error-message">{errors.contactNumber?.message}</span>
                </div>

                <div className="field occasion">
                    <label htmlFor="occasion">Occasion (optional)</label>
                    <div className="options">
                        <select {...register("occasion")}>
                            <option value="select">Select occasion</option>
                            <option value="birthday">Birthday</option>
                            <option value="engagement">Engagement</option>
                            <option value="anniversary">Anniversary</option>
                        </select>
                    </div>
                </div>

                <div className="field guest">
                    <label htmlFor="guests">Guests</label>
                    <input 
                        type="number" 
                        placeholder="2" 
                        {...register("guests")} 
                    />
                    <span className="error-message">{errors.guests?.message}</span>
                </div>

                <div className="field">
                    <label htmlFor="date">Date & Time</label>
                    <input 
                        type="datetime-local" 
                        {...register("date")} 
                    />
                    <span className="error-message">{errors.date?.message}</span>
                </div>

                <button className="reserve-btn" type="submit">Reserve</button>
            </fieldset>
        </form>
    );
}

export default Form;
