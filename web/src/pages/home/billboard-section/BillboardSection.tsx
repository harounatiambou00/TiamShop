import "./styles.css";

const BillboardSection = () => {
  return (
    <div className="w-full pt-5 px-10 ">
      <div className="drop-shadow-md rounded-md cursor-pointer first_panel">
        <img
          src="https://www.tunisianet.com.tn/modules/wbimageslider/views/img/a800d8f4234a4a4d21e8cca9827edaed8d0c6dc9_MEA_1580x460.jpg"
          alt=""
          className="w-full rounded-md"
        />
        <button className="fixed bottom-2 left-5 rounded-md text-sm font-normal">
          <span>Savoir plus</span>
        </button>
      </div>
    </div>
  );
};

export default BillboardSection;
