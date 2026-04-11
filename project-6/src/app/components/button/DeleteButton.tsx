import Swal from "sweetalert2";
import { DeleteButtonProps } from "@/interface/common.interface";

const DeleteButton = (props: DeleteButtonProps) => {
  const { api, id, onDeleteSuccess } = props;

  const handleClick = () => {
    Swal.fire({
      title: "Bạn chắc chắn muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(api, {
          method: "DELETE",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.code === "success") {
              onDeleteSuccess(id);
            }
          });

        Swal.fire({
          title: "Xóa thành công!",
          text: "Công việc của bạn đã xóa.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="h-[34px] px-[20px] bg-[#FF0000] rounded-[4px] text-[#FFFFFF] text-[14px] font-[400] cursor-pointer"
      >
        Xoá
      </button>
    </>
  );
};

export default DeleteButton;
