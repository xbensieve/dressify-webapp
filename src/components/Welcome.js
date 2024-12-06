import "../styles/Common.css";
const Welcome = () => {
  return (
    <>
      <img
        class="banner-img"
        src="https://levents.asia/cdn/shop/files/BANNER_WEB_1.jpg?v=1728379605&width=1500"
        alt=""
      ></img>
      <p id="welcome">
        UNIQUELY CLASSIC CAMPAIGN | FW24 “Mỗi cá thể là một màu sắc riêng
        biệt!”, đó cũng là nguồn cảm hứng lớn nhất để phát triển nên bộ sưu tập
        Uniquely Classic. Với châm ngôn bất biến tôn vinh những giá trị độc bản
        của mỗi người, từng thiết kế trong BST được kết hợp đan xen lẫn nhau
        giữa sự đơn giản trường tồn và những nét tinh tế đương đại, hệ thống
        phom dáng được nghiên cứu chuyên sâu hơn để luôn theo dòng chảy của thời
        đại, và với một bảng màu nhã nhặn cho cảm giác dễ chịu, tất cả sự kết
        hợp đó chỉ một sứ mệnh duy nhất là giúp khách hàng tự tin thể hiện phong
        cách riêng biệt tránh đi sự rập khuôn. Bộ sưu tập Uniquely Classic không
        chỉ mang tính thời trang mà còn là lời khẳng định về phong cách, sự khác
        biệt và sự tự tin, để mỗi cá nhân trở thành “classic” theo cách riêng
        của mình.
      </p>
      <div
        style={{
          display: "grid",
          "grid-template-columns": "100px 100px",
        }}
      >
        <div
          style={{
            "background-color": "red",
          }}
        >
          div 1
        </div>
        <div
          style={{
            "background-color": "pink",
          }}
        >
          div 2
        </div>
      </div>
      <div
        style={{
          display: "grid",
          "margin-top": "10px",
          "grid-template-columns": "100px 100px",
        }}
      >
        <div
          style={{
            "background-color": "red",
          }}
        >
          div 1
        </div>
        <div
          style={{
            "background-color": "pink",
          }}
        >
          div 2
        </div>
      </div>
    </>
  );
};

export default Welcome;
