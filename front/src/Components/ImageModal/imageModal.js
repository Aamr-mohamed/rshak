import React, { useState } from "react";

const CheckupModal = ({ checkup }) => {
  console.log(checkup);
  const backendUrl = process.env.REACT_APP_API_URL;

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  // Open modal and set image
  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  return (
    <div>
      {checkup.checkupImageName ? (
        <img
          src={`${backendUrl}/uploads/${checkup.checkupImageName}`}
          alt="checkup-image"
          className="w-full h-20 p-3 rounded-3xl cursor-pointer"
          onClick={() =>
            handleImageClick(`${backendUrl}/uploads/${checkup.checkupImageName}`)
          }
        />
      ) : (
        <p>لا توجد صورة للتحليل حتى الآن</p>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-5 rounded-lg relative max-w-screen-lg"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on click inside modal
          >
            <button
              className="absolute top-2 right-2 text-black"
              onClick={handleCloseModal}
            >
              ✖
            </button>
            <img
              src={modalImage}
              alt="Enlarged checkup"
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckupModal;
