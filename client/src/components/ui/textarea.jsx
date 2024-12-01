const TextArea = ({ label, placeholder }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <textarea
        className="w-full h-24 p-3 border rounded-md border-gray-400 focus:ring-2 focus:ring-secondary-foreground focus:outline-none resize-none"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export { TextArea };
