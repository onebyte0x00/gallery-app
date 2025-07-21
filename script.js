document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const albumSelector = document.getElementById('album-selector');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentImage = document.getElementById('current-image');
    const imageInfo = document.getElementById('image-info');
    const thumbnailContainer = document.getElementById('thumbnail-container');
    
    // State variables
    let currentAlbum = '';
    let currentIndex = 0;
    let images = [];
    
    // Album data - replace with your actual image paths
    const albums = {
        img1: [
            { src: 'img/img1/photo1.jpg', alt: 'Photo 1 from Album 1' },
            { src: 'img/img1/photo2.jpg', alt: 'Photo 2 from Album 1' }
            // Add more images as needed
        ],
        img2: [
            { src: 'img/img2/photo1.jpg', alt: 'Photo 1 from Album 2' },
            { src: 'img/img2/photo2.jpg', alt: 'Photo 2 from Album 2' }
            // Add more images as needed
        ]
        // Add more albums as needed
    };
    
    // Event listeners
    albumSelector.addEventListener('change', loadAlbum);
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Functions
    function loadAlbum() {
        currentAlbum = albumSelector.value;
        
        if (!currentAlbum) {
            // No album selected
            currentImage.src = '';
            currentImage.alt = '';
            imageInfo.textContent = '';
            thumbnailContainer.innerHTML = '';
            return;
        }
        
        images = albums[currentAlbum];
        currentIndex = 0;
        displayCurrentImage();
        createThumbnails();
    }
    
    function displayCurrentImage() {
        if (images.length === 0) return;
        
        const image = images[currentIndex];
        currentImage.src = image.src;
        currentImage.alt = image.alt;
        imageInfo.textContent = `${currentIndex + 1} of ${images.length}: ${image.alt}`;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === images.length - 1;
    }
    
    function createThumbnails() {
        thumbnailContainer.innerHTML = '';
        
        images.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image.src;
            thumbnail.alt = image.alt;
            thumbnail.className = 'thumbnail';
            
            thumbnail.addEventListener('click', () => {
                currentIndex = index;
                displayCurrentImage();
            });
            
            thumbnailContainer.appendChild(thumbnail);
        });
    }
    
    function showPreviousImage() {
        if (currentIndex > 0) {
            currentIndex--;
            displayCurrentImage();
        }
    }
    
    function showNextImage() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            displayCurrentImage();
        }
    }
    
    // Initialize with first album if needed
     albumSelector.value = 'img1';
     loadAlbum();
});
