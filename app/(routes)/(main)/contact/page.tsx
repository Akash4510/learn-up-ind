import React from "react";

import { ContactForm } from "./_components/contact-form";

const ContactPage = () => {
  return (
    <div className="max-w-[600px] mx-auto my-12 space-y-12">
      <div className="space-y-5">
        <div>
          <h1 className="text-4xl">Have a question?</h1>
          <h3 className="text-lg text-muted-foreground">
            Drop us a message and our team will get back to you shortly.
          </h3>
        </div>

        <ContactForm />
      </div>

      {/* <div>
        <h1 className="text-xl">Connect with us on our social platforms</h1>
        <div></div>
      </div> */}
    </div>
  );
};

export default ContactPage;
