import "./WeddingStage.css";

export default function WeddingStage() {
  return (
    <div className="wedding-stage" aria-hidden="true">
      <div className="wedding-stage-torana">
        <img
          className="wedding-stage-torana-main"
          src="/assets/wedding/flowers/top-torana.png"
          alt=""
          draggable="false"
        />
        <img
          className="wedding-stage-torana-support"
          src="/assets/wedding/flowers/mango-marigold.png"
          alt=""
          draggable="false"
        />
      </div>

      <div className="wedding-stage-garland wedding-stage-garland-left">
        <img
          src="/assets/wedding/flowers/left-hanging-garland.png"
          alt=""
          draggable="false"
        />
      </div>
      <div className="wedding-stage-garland wedding-stage-garland-right">
        <img
          src="/assets/wedding/flowers/right-hanging-garland.png"
          alt=""
          draggable="false"
        />
      </div>

      <div className="wedding-stage-corner wedding-stage-corner-left">
        <img
          src="/assets/wedding/flowers/bottom-floral-corner.png"
          alt=""
          draggable="false"
        />
      </div>
      <div className="wedding-stage-corner wedding-stage-corner-right">
        <img
          src="/assets/wedding/flowers/bottom-floral-corner.png"
          alt=""
          draggable="false"
        />
      </div>
    </div>
  );
}
