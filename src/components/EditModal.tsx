interface Props {
  handleEditModal: () => void;
  toggleEditing: () => void;
  onDeleteClick: () => void;
}

const EditModal = ({
  handleEditModal,
  toggleEditing,
  onDeleteClick,
}: Props) => {
  return (
    <>
      <div
        className="absolute w-screen h-screen bg-black opacity-40 z-40 max-w-4xl"
        style={{
          top: `${window.scrollY}px`,
        }}
        onClick={handleEditModal}
      ></div>
      <div
        className="absolute bottom-0 w-screen h-28 bg-white z-50 rounded-t-[40px] flex flex-col items-center justify-center space-y-2 max-w-4xl"
        style={{
          bottom: `-${window.scrollY}px`,
        }}
      >
        <button
          className="w-[90%] h-10 rounded-full border-2 font-bold"
          onClick={toggleEditing}
        >
          수정
        </button>
        <button
          className="w-[90%] h-10 rounded-full border-2 font-bold"
          onClick={onDeleteClick}
        >
          삭제
        </button>
      </div>
    </>
  );
};

export default EditModal;
