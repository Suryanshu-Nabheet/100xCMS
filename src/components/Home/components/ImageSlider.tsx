import '../home.css';

// Image Slider Component
export function ImageSlider() {
  const images = [
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  ];

  const duplicatedImages = [...images, ...images];

  return (
    <section className="home-image-slider">
      {/* Dark blue aesthetic spots */}
      <div className="home-image-slider-spots home-image-slider-spot-1"></div>
      <div className="home-image-slider-spots home-image-slider-spot-2"></div>
      
      <div className="home-image-slider-container">
        <div className="home-image-slider-header">
          <h2 className="home-image-slider-title">
            <span className="home-image-slider-title-white">Our</span>{" "}
            <span className="home-image-slider-title-blue">Courses</span>
          </h2>
          <p className="home-image-slider-description">
            Explore our comprehensive courses and learning paths
          </p>
        </div>

        <div className="home-slider-container">
          <div className="home-slider-track">
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className={`home-slider-item ${
                  index === 0 ? 'home-slider-item-first' : index === duplicatedImages.length - 1 ? 'home-slider-item-last' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`Project ${index + 1}`}
                  className="home-slider-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
