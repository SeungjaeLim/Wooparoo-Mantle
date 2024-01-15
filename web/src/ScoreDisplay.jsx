function ScoreDisplay(props) {
    return (
      <div class="mt-4">
        <span class="inline-block bg-green-200 rounded-full px-4 py-1 text-sm font-semibold text-green-800">
          Score: {props.score}
        </span>
      </div>
    );
  }
  
  export default ScoreDisplay;
  