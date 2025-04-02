        const API_KEY = 'AIzaSyDhumW05-eindh-x2OblLKYxc1cT7Sxeyc';

        const dropZone = document.getElementById('dropZone');
        const imageInput = document.getElementById('imageInput');
        const imagePreview = document.getElementById('imagePreview');
        const resultDiv = document.getElementById('result');

        // Handle drag and drop events
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            handleImage(file);
        });

        dropZone.addEventListener('click', () => imageInput.click());

        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            handleImage(file);
        });

        function handleImage(file) {
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreview.style.display = 'block';
                    imagePreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }

        async function analyzeImage() {
            const file = imageInput.files[0];
            if (!file) {
                alert('Pilih gambar terlebih dahulu');
                return;
            }

            toggleLoading(true);

            try {
                const base64Image = await toBase64(file);
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [
                                { text: "Ini adalah gambar dari anime apa? Berikan jawaban dalam format:\nJudul Anime: [Judul Inggris] ([Judul Jepang])\nTV: [Tahun Rilis] [Status] ([Jumlah Episode])\nDeskripsi: [Deskripsi singkat 1-2 kalimat]\nGenre: [Genre1], [Genre2], [Genre3]\nJika tidak tahu, jawab 'Tidak dikenali'" },
                                {
                                    inline_data: {
                                        mime_type: file.type,
                                        data: base64Image.split(',')[1]
                                    }
                                }
                            ]
                        }]
                    })
                });

                if (!response.ok) {
                    const errorData = await response.text();
                    console.error("Response error:", errorData);
                    throw new Error("Error response dari API");
                }

                const data = await response.json();
                const resultText = data.candidates[0].content.parts[0].text;
                displayResult(resultText);
            } catch (error) {
                console.error('Error:', error);
                alert('Terjadi kesalahan saat memproses gambar');
            } finally {
                toggleLoading(false);
            }
        }

        function toggleLoading(isLoading) {
            const spinner = document.getElementById('spinner');
            const buttonText = document.getElementById('buttonText');
            spinner.style.display = isLoading ? 'inline-block' : 'none';
            buttonText.style.display = isLoading ? 'none' : 'block';
        }

        function displayResult(text) {
            resultDiv.style.display = 'block';
            const resultContainer = document.getElementById('resultText');
            resultContainer.innerHTML = '';

            // Parse respons AI
            const titleMatch = text.match(/Judul Anime:\s*(.+?)\s*(\(.*?\))?\n/);
            const tvMatch = text.match(/TV:\s*(.+?)\n/);
            const descMatch = text.match(/Deskripsi:\s*(.+?)\n/);
            const genreMatch = text.match(/Genre:\s*(.+)/);

            // Bangun tampilan hasil
            if (titleMatch) {
                const titleEl = document.createElement('h2');
                titleEl.className = 'anime-title';
                titleEl.innerHTML = `
                    ${titleMatch[1]} 
                    <span style="color: #94a3b8; font-size: 1.1rem">${titleMatch[2] || ''}</span>
                `;
                resultContainer.appendChild(titleEl);
            }

            if (tvMatch) {
                const tvEl = document.createElement('div');
                tvEl.className = 'tv-info';
                tvEl.innerHTML = `<i class="ph ph-tv"></i> ${tvMatch[1]}`;
                resultContainer.appendChild(tvEl);
            }

            if (descMatch) {
                const descEl = document.createElement('p');
                descEl.className = 'description';
                descEl.textContent = descMatch[1];
                resultContainer.appendChild(descEl);
            }

            if (genreMatch) {
                const genreContainer = document.createElement('div');
                genreContainer.style.marginTop = '1rem';
                genreMatch[1].split(',').forEach(genre => {
                    const genreEl = document.createElement('span');
                    genreEl.className = 'genre-tag';
                    genreEl.textContent = genre.trim();
                    genreContainer.appendChild(genreEl);
                });
                resultContainer.appendChild(genreContainer);
            }
        }

        function toBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }

        // === Anti Inspect Script ===
        // Blokir klik kanan
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });

        // Blokir pintasan keyboard umum untuk inspect element
        document.addEventListener('keydown', function (e) {
            // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
            if (e.keyCode === 123 ||
                (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
                (e.ctrlKey && e.keyCode === 85)) {
                e.preventDefault();
            }
        });
