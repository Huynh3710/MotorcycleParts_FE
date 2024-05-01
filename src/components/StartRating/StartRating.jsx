import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

export function StartRating({
  numStart,
  readonly,
  size,
  showDetail,
  countReview,
  // setForSpareParts,
  setRating,
}) {
  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
    // setForSpareParts(sparePartsId?.id);
    // other logic
  };

  // Optional callback functions
  const onPointerEnter = () => {};
  const onPointerLeave = () => {};
  const onPointerMove = (value, index) => {};

  return (
    <div className="d-flex align-items-center gap-3">
      <Rating
        onClick={handleRating}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        readonly={readonly}
        initialValue={numStart}
        allowFraction
        size={size}
        className="pb-1"
        /* Available Props */
      />
      {showDetail && <div>{countReview}</div>}
    </div>
  );
}
