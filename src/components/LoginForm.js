export const LoginForm = () => {
  return (
    <footer class="bg-orange-500 text-white py-6">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 class="text-xl font-bold mb-2">About Us</h3>
            <p class="text-sm">
              We provide the best products and services to cater to your needs.
              Quality and customer satisfaction are our top priorities.
            </p>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-2">Quick Links</h3>
            <ul>
              <li class="mb-1">
                <a href="#" class="hover:underline">
                  Home
                </a>
              </li>
              <li class="mb-1">
                <a href="#" class="hover:underline">
                  Services
                </a>
              </li>
              <li class="mb-1">
                <a href="#" class="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-2">Follow Us</h3>
            <div class="flex space-x-4">
              <a href="#" class="hover:text-gray-300">
                <i class="fab fa-facebook-f"></i> Facebook
              </a>
              <a href="#" class="hover:text-gray-300">
                <i class="fab fa-twitter"></i> Twitter
              </a>
              <a href="#" class="hover:text-gray-300">
                <i class="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </div>
        </div>
        <div class="mt-6 border-t border-orange-400 pt-4 text-center text-sm">
          <p>© 2024 YourCompany. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
