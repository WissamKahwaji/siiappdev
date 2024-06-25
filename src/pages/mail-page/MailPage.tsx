import logo from "../../assets/logo_sii_new_2.png";

const MailPage = () => {
  const emails = [
    { name: "General Inquiry", email: "info@siiapp.net" },
    { name: "Help", email: "help@siiapp.net" },
    { name: "Support", email: "support@siiapp.net" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-header">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-navBackground to-navBackground/60 text-white">
          <img
            src={logo}
            alt="Help"
            className="w-28 h-auto rounded-md mb-4 p-2 sm:w-40 sm:h-auto"
          />
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 font-serif text-center">
            Need Help? Contact Us!
          </h1>
          <p className="text-center text-sm sm:text-lg">
            If you have any questions or need assistance, feel free to reach out
            to us via email. <br />
            We're here to help!
          </p>
        </div>
        <div className="p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Contact Emails
          </h2>
          <ul className="space-y-4">
            {emails.map((contact, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-300 sm:border-2 sm:border-secondary"
              >
                <span className="text-sm sm:text-lg font-medium">
                  {contact.name}
                </span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-blue-500 hover:underline"
                >
                  {contact.email}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center">
            <a
              href="https://www.siiapp.net"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-secondary text-navBackground font-semibold rounded-lg hover:bg-secondary-dark transition duration-200"
            >
              Visit Our Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailPage;
