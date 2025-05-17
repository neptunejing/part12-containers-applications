const Filter = ({ filterString, handleChangeFilter }) => {
	return (
		<div>
			filter shown with:{' '}
			<input value={filterString} onChange={handleChangeFilter} />
		</div>
	);
};

export default Filter;
