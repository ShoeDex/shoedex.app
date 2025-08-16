import { forwardRef } from "react";
import Image from "next/image";

const Card = forwardRef(({ id, frontSrc, frontAlt, backSrc, backAlt }, ref) => {
  return (
    <div className="card" id={id} ref={ref}>
      <div className="card-wrapper">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <Image
              priority
              src={frontSrc}
              width={400}
              height={500}
              alt={frontAlt}
            />
          </div>
          <div className="flip-card-back">
            <Image
              priority
              src={backSrc || frontSrc}
              width={400}
              height={500}
              alt={backAlt || frontAlt}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Card;
