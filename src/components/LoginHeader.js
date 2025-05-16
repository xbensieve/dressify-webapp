const LoginHeader = () => {
  return (
    <>
      <a href="/" class="flex items-center justify-center mb-8 space-x-4 group">
        <img
          src="/logo.png"
          alt="Logo"
          class="h-14 w-14 object-contain transition-transform group-hover:opacity-90 group-active:opacity-70 rounded-full"
        />
        <span
          class="text-4xl font-inter text-gray-900 tracking-wide transition-all duration-300 ease-in-out cursor-pointer 
           group-hover:opacity-90 group-active:opacity-70"
        >
          Xbensive
        </span>
      </a>

      <h1 class="text-3xl font-semibold mb-6 text-black text-center">
        Sign Up
      </h1>
    </>
  );
};

export default LoginHeader;
