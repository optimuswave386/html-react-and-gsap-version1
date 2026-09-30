import { React, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, NavLink, BrowserRouter } from 'react-router-dom'
import '../assets/css/main.css' // Import main CSS file
import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import axios from 'axios'

function Helpcenter() {

  function tryContactInformationVerification(contactInfoEmailaddress, issueDescription) {
        const email = contactInfoEmailaddress;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          console.log("Please enter a valid email address.");
          return;
        }
        if (email) {
          console.log('Contact Information Verified:');
          console.log(`Email: ${email}`);
          console.log(`Issue Description: ${issueDescription}`);
        
          {/* Here you would typically send the email to your server or API */}
          console.log('Support request submitted. A technician will contact you soon.');

        } else {
          console.log('Please enter a valid email address.');
        }
  }

  useEffect(() => {
    
    // Add event listener on mount
    const contactform = document.getElementById('contactform');
    contactform.addEventListener('submit', (e) => {
        e.preventDefault();
        const contactInformation = document.getElementById('contactInfo');
        const issueDescription = document.getElementById('issueDescription');      
        const contactInfoEmailaddress = contactInformation.value;
        const issueDesc = issueDescription.value;
        
        //validate contact information
        tryContactInformationVerification(contactInfoEmailaddress, issueDesc);
        
        //Post the support request to the server
        axios.post(import.meta.env.VITE_EXPRESSAPI_URL + 'log-support-request', {
          contactEmail: contactInfoEmailaddress,
          issueDescription: issueDesc
        })
        .then(response => {
          console.log('Support request successfully sent:', response.data);
        })
        .catch(error => {
          console.error('Error sending support request:', error);
        });

        // Optionally, you can also close the modal after submission
        contactInformation.value = '';
        issueDescription.value = '';
        const closeFormButton = document.getElementById('closeForm');
        closeFormButton.click();

      });

    // Clean up event listener on unmount
    return () => {
      contactform.removeEventListener('submit', () => {});
    };

  }, []); // Empty dependency array ensures it runs only once on mount/unmount

  return (
    <>

      <Header />

      <div className="container">

        <div id="gridcontainer">

            <div id="one" className="px-5 py-5 mb-0 mt-0 helpcenter-hero" style={{background: "linear-gradient(to bottom, #87CEEB 0%, #4169E1 50%, #191970 100%)", color: "white"}}>

                <h1 className="display-5 fw-bold">Helpcenter</h1>
        <span className="display-6 mb-0 lh-1">We understand that navigating technology can sometimes be challenging. Whether you're encountering a computer issue, looking to upgrade your hardware, or seeking advice on software solutions, our dedicated support team is here to assist you every step of the way. Submit a request for remote assistance, describe your issue, and one of our technicians will get in touch with you as soon as possible. In some cases, our technicians can remotely access your computer (with your permission) to diagnose and resolve issues directly.</span>

        <hr />

          {/* Button trigger modal */}
          <button type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Open Support Ticket
          </button>

          {/* Modal */}
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                
<form id="contactform">               
                
                <div className="modal-header text-bg-light px-3 py-3 mb-0 mt-0">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Support Request Form</h1>
                  <div style={{ float: "right", marginLeft: "auto" }}><button id="closeForm1" type="button" className="" style={{ outline: "transparent", border: "none" }} data-bs-dismiss="modal">Close (x)</button></div>
                </div>
                <div className="modal-body text-bg-light px-3 py-3 mx-0 mb-0 mt-0">
                  
                      <h5 className="mb-3 text-bg-light">Issue Details</h5>

                        <div className="mb-3 px-0 py-0 mx-0 mt-0 text-bg-light">
                          <label htmlFor="issueDescription" className="form-label">Describe your issue:</label>
                          <textarea className="form-control" id="issueDescription" rows="10" placeholder="Please provide a concise description of the issue you are facing with your computer or device." required></textarea>
                        </div>
                        <div className="mb-3 text-bg-light">
                          <label htmlFor="contactInfo" className="form-label">Contact Information:</label>
                          <input type="email" className="form-control" id="contactInfo" placeholder="name@example.com" required />
                        </div>

                </div>
                <div className="modal-footer text-bg-light">
                  <button type="submit" className="btn btn-primary">Submit Request</button>
                  <button id="closeForm" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>

</form>

              </div>
            </div>
          </div>

            </div>

            <div id="two">
                
                <div className="container p-5">

                  <div className="row">
                
                    <div className="col-12">

  <h2>FAQs (Frequently Asked Questions)</h2>
  <p className="lead">
    Find answers to common questions, troubleshooting guidance, and an overview of how our support process works. If you can't find what you're looking for, open a support ticket above and a technician will follow up with you.
  </p>

  <h3 className="mt-4">What We Can Help With</h3>

  <ol>
    <li>
      <p><strong>Troubleshooting and Diagnostics:</strong> Our team is skilled in identifying the root causes of technical issues. From operating system problems to device malfunctions, we'll guide you through troubleshooting steps to get your system back on track. Typical cases include slow startups, frequent crashes, error messages, unresponsive applications, network and Wi-Fi drops, and printers or peripherals that stop working.</p>
    </li>
    <li>
      <p><strong>Software Installation and Configuration:</strong> Need help installing or configuring new software? We offer step-by-step assistance to ensure that your applications are set up correctly and running smoothly. This includes operating system updates, productivity suites, email clients, browsers, drivers, and licensing or activation problems.</p>
    </li>
    <li>
      <p><strong>Hardware Assistance:</strong> If you're experiencing hardware issues, whether it's a malfunctioning monitor, a broken keyboard, or performance slowdowns, we provide solutions and advice on repairs, upgrades, or replacements. We can help you decide whether adding memory, swapping in a solid-state drive, or replacing the device altogether makes the most sense for your budget.</p>
    </li>
    <li>
      <p><strong>Security and Data Protection:</strong> Protecting your system and personal information is a priority. We can help you set up firewalls, antivirus programs, and backup solutions to keep your data secure from online threats. We also advise on strong passwords, two-factor authentication, safe browsing habits, and how to recognize phishing emails and suspicious links.</p>
    </li>
    <li>
      <p><strong>General Advice:</strong> From choosing the right computer for your needs to understanding the best software for productivity, our team is ready to offer recommendations based on your specific requirements. Whether you're setting up a home office, buying a first laptop, or comparing software options, we'll explain the trade-offs in plain language.</p>
    </li>
    <li>
      <p><strong>Knowledgebase:</strong> Our knowledgebase is a centralized repository where information is stored, organized, and managed for easy access and use. It helps you find answers, solve problems on your own, and understand common processes and systems, with articles, how-to guides, and troubleshooting checklists you can revisit at any time.</p>
    </li>
  </ol>

  <h3 className="mt-5 mb-3">Common Questions</h3>

  <div className="accordion" id="faqAccordion">

    <div className="accordion-item">
      <h2 className="accordion-header" id="faqHeadingOne">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqOne" aria-expanded="true" aria-controls="faqOne">
          How do I request support?
        </button>
      </h2>
      <div id="faqOne" className="accordion-collapse collapse show" aria-labelledby="faqHeadingOne" data-bs-parent="#faqAccordion">
        <div className="accordion-body">
          Click <strong>Open Support Ticket</strong> at the top of this page, describe the issue you're experiencing, and enter your email address. The more detail you include, such as error messages, when the problem started, and what you were doing at the time, the faster we can help.
        </div>
      </div>
    </div>

    <div className="accordion-item">
      <h2 className="accordion-header" id="faqHeadingTwo">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqTwo" aria-expanded="false" aria-controls="faqTwo">
          What happens after I submit a ticket?
        </button>
      </h2>
      <div id="faqTwo" className="accordion-collapse collapse" aria-labelledby="faqHeadingTwo" data-bs-parent="#faqAccordion">
        <div className="accordion-body">
          Your request is logged and reviewed by a technician, who will contact you at the email address you provided. Depending on the issue, we may ask follow-up questions, send you troubleshooting steps, or offer to schedule a remote session.
        </div>
      </div>
    </div>

    <div className="accordion-item">
      <h2 className="accordion-header" id="faqHeadingThree">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqThree" aria-expanded="false" aria-controls="faqThree">
          How does remote assistance work?
        </button>
      </h2>
      <div id="faqThree" className="accordion-collapse collapse" aria-labelledby="faqHeadingThree" data-bs-parent="#faqAccordion">
        <div className="accordion-body">
          With your permission, a technician can connect to your computer over the internet to diagnose and fix problems directly. Remote access only happens with your explicit approval, you can watch everything the technician does on your screen, and you can end the session at any time.
        </div>
      </div>
    </div>

    <div className="accordion-item">
      <h2 className="accordion-header" id="faqHeadingFour">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqFour" aria-expanded="false" aria-controls="faqFour">
          Is it safe to allow a technician to access my computer?
        </button>
      </h2>
      <div id="faqFour" className="accordion-collapse collapse" aria-labelledby="faqHeadingFour" data-bs-parent="#faqAccordion">
        <div className="accordion-body">
          Remote sessions are only started by you, after we've been in touch through the contact details on your ticket. We will never ask for your passwords by email, and you should never share them with anyone who contacts you unexpectedly. If you're unsure whether a message really came from us, submit a new ticket and we'll confirm.
        </div>
      </div>
    </div>

    <div className="accordion-item">
      <h2 className="accordion-header" id="faqHeadingFive">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqFive" aria-expanded="false" aria-controls="faqFive">
          What information should I include in my request?
        </button>
      </h2>
      <div id="faqFive" className="accordion-collapse collapse" aria-labelledby="faqHeadingFive" data-bs-parent="#faqAccordion">
        <div className="accordion-body">
          Helpful details include the device and operating system you're using, the exact wording of any error messages, when the problem first appeared, and anything that changed just before it started (a new program, an update, or a power outage). Please don't include passwords or payment card numbers in your request.
        </div>
      </div>
    </div>

    <div className="accordion-item">
      <h2 className="accordion-header" id="faqHeadingSix">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqSix" aria-expanded="false" aria-controls="faqSix">
          Should I back up my data before getting help?
        </button>
      </h2>
      <div id="faqSix" className="accordion-collapse collapse" aria-labelledby="faqHeadingSix" data-bs-parent="#faqAccordion">
        <div className="accordion-body">
          Yes, whenever possible. Before any major repair, upgrade, or reinstall, make sure your important files (documents, photos, and anything you can't replace) are copied to an external drive or a cloud backup. If you're not sure how, we can walk you through it.
        </div>
      </div>
    </div>

    <div className="accordion-item">
      <h2 className="accordion-header" id="faqHeadingSeven">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqSeven" aria-expanded="false" aria-controls="faqSeven">
          Can you help with problems that aren't listed here?
        </button>
      </h2>
      <div id="faqSeven" className="accordion-collapse collapse" aria-labelledby="faqHeadingSeven" data-bs-parent="#faqAccordion">
        <div className="accordion-body">
          Very likely. The topics above are the most common, but if your issue involves a computer, a device, or software, submit a ticket and describe it. If it's outside what we can assist with, we'll let you know and, where possible, point you in the right direction.
        </div>
      </div>
    </div>

    <div className="accordion-item">
      <h2 className="accordion-header" id="faqHeadingEight">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqEight" aria-expanded="false" aria-controls="faqEight">
          What if I have a question about an order?
        </button>
      </h2>
      <div id="faqEight" className="accordion-collapse collapse" aria-labelledby="faqHeadingEight" data-bs-parent="#faqAccordion">
        <div className="accordion-body">
          Include your order details in a support ticket, or check the Orders page after signing in for payment information and delivery status. Mention what you ordered and what you need help with so we can respond quickly.
        </div>
      </div>
    </div>

  </div>

</div>

<p className="text-muted small mt-5 mb-0">
  <strong>Privacy and Terms:</strong> The email address and issue description you submit in a support request are used only to respond to your request and to improve our support services. We do not sell your personal information, and we will not ask you for passwords or payment card details through this form. Remote assistance sessions are only carried out with your permission and can be ended by you at any time. Support is provided on a reasonable-effort basis and does not guarantee that every issue can be resolved. We recommend backing up your important data before any repair or upgrade. By submitting a support request, you agree to these terms and to our handling of your information as described here. Questions about how your information is used can be sent through a support ticket.
</p>

                  </div>                  

              </div>
              
            </div>

            <div id="seven">
              <Footer />
            </div>
        
        </div>

      </div>

    </>
  )
}

export default Helpcenter
