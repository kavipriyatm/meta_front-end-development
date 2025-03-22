import React, { useState } from 'react';
import "./styles/ReservationsContent.css";

function ReservationsContent() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",   // changed from 'telephone' to 'contact'
        occasion: "",
        guests: "",
        date: "",
    });

    const [formError, setFormError] = useState({});

    const onChangeHandler = (event) => {
        setFormData(() => ({
            ...formData,
            [event.target.name]: event.target.value
        }));
    };

    const validateForm = () => {
        let err = {};

        if (formData.name === "") {
            err.name = "* Full name required!";
        }

        if (formData.email === "") {
            err.email = "* Email required!";
        } else {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!regex.test(formData.email)) {
                err.email = "Email not valid!";
            }
        }

        if (formData.contact === "") {
            err.contact = "* Contact number required!";
        } else {
            // Indian contact number validation: starts with 6-9 and has exactly 10 digits
            let phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(formData.contact)) {
                err.contact = "Contact number not valid! Enter a 10-digit mobile number.";
            }
        }

        if (formData.guests === "") {
            err.guests = "* Please specify number of guests!";
        }

        if (formData.date === "") {
            err.date = "* Please specify date and time!";
        }

        setFormError({ ...err });
        return Object.keys(err).length < 1;
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.table(formData);

        let isValid = validateForm();
        if (isValid) {
            alert("Submitted");
        }
    };

    return (
        <div className="res-content-wrapper">
            <div className="res-content-container">
                <div className="text">
                    <h2>Experience the perfect balance of tradition and luxury.</h2>
                    <p>At Little Lemon, we take great pride in providing our customers with the greatest luxurious experience with a touch of <em>tradition</em>.</p>
                    <p>Book a table with us to share in this experience.</p>
                </div>

                <div className="form">
                    <h1>Reserve a Table</h1>
                    <p>Please fill in and submit form to book your reservation at Little Lemon.</p>

                    <form onSubmit={onSubmitHandler}>
                        <fieldset>
                            <div className="field">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    name="name"
                                    onChange={onChangeHandler}
                                />
                                <span className="non-valid">{formError.name}</span>
                            </div>

                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    placeholder="text@email.com"
                                    name="email"
                                    onChange={onChangeHandler}
                                />
                                <span className="non-valid">{formError.email}</span>
                            </div>

                            <div className="field">
                                <label htmlFor="contact">Contact Number</label>
                                <input
                                    type="tel"
                                    placeholder="9876543210"
                                    name="contact"
                                    maxLength="10"
                                    onChange={onChangeHandler}
                                />
                                <span className="non-valid">{formError.contact}</span>
                            </div>

                            <div className="guestsdate">
                                <div className="field occasion">
                                    <label htmlFor="occasion">Occasion (optional)</label>
                                    <div className="options">
                                        <select name="occasion" onChange={onChangeHandler}>
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
                                        placeholder="0"
                                        name="guests"
                                        onChange={onChangeHandler}
                                    />
                                    <span className="non-valid">{formError.guests}</span>
                                </div>
                            </div>

                            <div className="field">
                                <label htmlFor="date">Date & Time</label>
                                <input
                                    type="datetime-local"
                                    name="date"
                                    onChange={onChangeHandler}
                                />
                                <span className="non-valid">{formError.date}</span>
                            </div>

                            <button className="reserve-btn" type="submit">Reserve</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ReservationsContent;
