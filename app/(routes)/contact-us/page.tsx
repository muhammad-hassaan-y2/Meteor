"use client";


import { Mail, Bug, ClipboardList, Flag } from "lucide-react"; 
import { useState, ChangeEvent, FormEvent } from "react"; 

const Report: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    feedbackType: "Bug Report",
    title: "",
    description: "",
    priority: "Low",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Feedback submitted successfully!");
        setFormData({
          email: "",
          feedbackType: "Bug Report",
          title: "",
          description: "",
          priority: "Low",
        });
      } else {
        const result = await response.json();
        alert(result.message || "Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Contact us</h1>
      <p className="text-center text-gray-600 mb-6">
        Report bugs, suggest improvements, or share your feedback.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <Mail className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="example@domain.com"
              className="w-full outline-none p-1"
            />
          </div>
        </div>

        {/* Feedback Type */}
        <div className="mb-4">
          <label htmlFor="feedbackType" className="block text-gray-700 font-medium mb-2">
            Feedback Type <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <Bug className="text-gray-400 w-5 h-5 mr-2" />
            <select
              name="feedbackType"
              id="feedbackType"
              value={formData.feedbackType}
              onChange={handleChange}
              required
              className="w-full outline-none p-1"
            >
              <option value="Bug Report">Bug Report</option>
              <option value="Feature Request">Feature Request</option>
              <option value="General Feedback">General Feedback</option>
            </select>
          </div>
        </div>

        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <ClipboardList className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter a brief title"
              className="w-full outline-none p-1"
            />
          </div>
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Provide detailed information..."
            className="w-full border border-gray-300 rounded-md p-2 outline-none"
          ></textarea>
        </div>

        {/* Priority Level */}
        <div className="mb-4">
          <label htmlFor="priority" className="block text-gray-700 font-medium mb-2">
            Priority Level <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <Flag className="text-gray-400 w-5 h-5 mr-2" />
            <select
              name="priority"
              id="priority"
              value={formData.priority}
              onChange={handleChange}
              required
              className="w-full outline-none p-1"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 text-white font-bold rounded-md border border-b-4 border-gray-700 ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-700 hover:bg-indigo-800"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default Report;
