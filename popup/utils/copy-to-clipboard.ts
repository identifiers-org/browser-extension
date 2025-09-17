
const copyToClipboard = (text: string, ev: any) => {
	ev.preventDefault();
	ev.stopPropagation();
	navigator.clipboard.writeText(text).then(
		() => {
			alert('Copied to clipboard')
		},
		(err) => {
			alert(`Failed to copy to clipboard: ${err}`);
		}
	);
}

export default copyToClipboard;