
export function Review({ review }) {
  return (
    <div className="review">
      <div className="review-header">
      <strong>{review?.user?.name}</strong> 
        <span>⭐ {review.calificacion}</span>
      </div>
      <p>{review.comentario}</p> 
    </div>
  );
}