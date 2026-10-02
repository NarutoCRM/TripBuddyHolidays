"use client";

import { useState } from "react";

export default function ContactForm() {
    const [showNotice, setShowNotice] = useState(false);

    return (
        <>
            <form
                className="mt-8 grid gap-5"
                onSubmit={(event) => {
                    event.preventDefault();
                    setShowNotice(true);
                }}
            >
                <div className="grid gap-5 md:grid-cols-2">
                    <label>
                        <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                            Name
                        </span>
                        <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            required
                            placeholder="Your name"
                            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-(--primary)"
                        />
                    </label>

                    <label>
                        <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                            Email
                        </span>
                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            required
                            placeholder="Your email"
                            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-(--primary)"
                        />
                    </label>
                </div>

                <label>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                        Phone
                    </span>
                    <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        placeholder="Your phone number"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-(--primary)"
                    />
                </label>

                <label>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                        Message
                    </span>
                    <textarea
                        name="message"
                        rows="6"
                        required
                        placeholder="Tell us about your travel requirements..."
                        className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-(--primary)"
                    />
                </label>

                <button
                    type="submit"
                    className="rounded-full bg-(--primary) px-7 py-4 text-sm font-black text-white"
                >
                    Check Contact Options
                </button>
            </form>

            {showNotice && (
                <p role="status" className="mt-5 text-sm leading-6 text-slate-600">
                    This form is not connected to an email service, so nothing was sent. Contact us at{" "}
                    <a className="font-bold text-(--primary)" href="mailto:info@tripbuddyholidays.com">
                        info@tripbuddyholidays.com
                    </a>{" "}
                    or <a className="font-bold text-(--primary)" href="tel:+18443654037">1-844-365-4037</a>.
                </p>
            )}
        </>
    );
}