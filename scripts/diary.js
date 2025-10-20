document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const progressList = document.getElementById('progressList');
    const coursesList = document.getElementById('coursesList');
    const addProgressBtn = document.getElementById('addProgressBtn');
    const progressModal = document.getElementById('progressModal');
    const closeProgressModal = document.getElementById('closeProgressModal');
    const cancelProgress = document.getElementById('cancelProgress');
    const saveProgress = document.getElementById('saveProgress');
    const progressForm = document.getElementById('progressForm');
    const courseModal = document.getElementById('courseModal');
    const closeCourseModal = document.getElementById('closeCourseModal');
    const cancelCourse = document.getElementById('cancelCourse');
    const saveCourse = document.getElementById('saveCourse');
    const courseForm = document.getElementById('courseForm');
    const courseProgress = document.getElementById('courseProgress');
    const progressValue = document.getElementById('progressValue');

    // Sample data (in real app, this would come from a database)
    let progressData = JSON.parse(localStorage.getItem('diaryProgress')) || [
        { id: 1, date: '2024-12-15', task: 'Верстка макета сайта', status: 'completed' },
        { id: 2, date: '2024-12-10', task: 'JavaScript основы', status: 'completed' },
        { id: 3, date: '2024-12-05', task: 'Работа с формами', status: 'in-progress' },
        { id: 4, date: '2024-12-01', task: 'Адаптивный дизайн', status: 'in-progress' }
    ];

    let coursesData = JSON.parse(localStorage.getItem('diaryCourses')) || [
        { id: 1, name: 'Веб-разработка', progress: 90 },
        { id: 2, name: 'JavaScript', progress: 70 },
        { id: 3, name: 'React', progress: 50 }
    ];

    // Initialize
    renderProgressList();
    renderCoursesList();

    // Progress range update
    courseProgress.addEventListener('input', function() {
        progressValue.textContent = this.value + '%';
    });

    // Open progress modal
    addProgressBtn.addEventListener('click', function() {
        // Set today's date as default
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('progressDate').value = today;
        progressModal.classList.add('active');
    });

    // Open course modal (will be called from course addition)
    function openCourseModal() {
        courseProgress.value = 0;
        progressValue.textContent = '0%';
        document.getElementById('courseName').value = '';
        courseModal.classList.add('active');
    }

    // Close progress modal
    function closeProgressModalFunc() {
        progressModal.classList.remove('active');
        progressForm.reset();
    }

    // Close course modal
    function closeCourseModalFunc() {
        courseModal.classList.remove('active');
        courseForm.reset();
    }

    closeProgressModal.addEventListener('click', closeProgressModalFunc);
    cancelProgress.addEventListener('click', closeProgressModalFunc);
    closeCourseModal.addEventListener('click', closeCourseModalFunc);
    cancelCourse.addEventListener('click', closeCourseModalFunc);

    // Save progress
    saveProgress.addEventListener('click', function() {
        const date = document.getElementById('progressDate').value;
        const task = document.getElementById('progressTask').value;
        const status = document.getElementById('progressStatus').value;

        if (date && task) {
            const newProgress = {
                id: Date.now(),
                date: date,
                task: task,
                status: status
            };

            progressData.unshift(newProgress); // Add to beginning
            localStorage.setItem('diaryProgress', JSON.stringify(progressData));
            renderProgressList();
            closeProgressModalFunc();
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    });

    // Save course
    saveCourse.addEventListener('click', function() {
        const name = document.getElementById('courseName').value;
        const progress = parseInt(courseProgress.value);

        if (name) {
            const newCourse = {
                id: Date.now(),
                name: name,
                progress: progress
            };

            coursesData.push(newCourse);
            localStorage.setItem('diaryCourses', JSON.stringify(coursesData));
            renderCoursesList();
            closeCourseModalFunc();
        } else {
            alert('Пожалуйста, введите название курса');
        }
    });

    // Render progress list
    function renderProgressList() {
        progressList.innerHTML = '';

        // Sort by date (newest first)
        const sortedProgress = [...progressData].sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedProgress.forEach(item => {
            const progressItem = document.createElement('div');
            progressItem.className = 'progress-item';
            
            // Format date
            const dateObj = new Date(item.date);
            const formattedDate = `${dateObj.getDate()} ${getMonthName(dateObj.getMonth())}`;

            // Status icon
            let statusIcon = '';
            let statusClass = '';
            switch(item.status) {
                case 'completed':
                    statusIcon = '✓';
                    statusClass = 'status-completed';
                    break;
                case 'in-progress':
                    statusIcon = '🔄';
                    statusClass = 'status-in-progress';
                    break;
                case 'planned':
                    statusIcon = '📅';
                    statusClass = 'status-planned';
                    break;
            }

            progressItem.innerHTML = `
                <span class="progress-date">${formattedDate}</span>
                <span class="progress-task">${item.task}</span>
                <div class="progress-status ${statusClass}">${statusIcon}</div>
            `;

            progressList.appendChild(progressItem);
        });

        // Add "Add Course" button if no courses exist
        if (coursesList.children.length === 0) {
            const addCourseBtn = document.createElement('button');
            addCourseBtn.className = 'btn btn-outline';
            addCourseBtn.textContent = '➕ Добавить курс';
            addCourseBtn.addEventListener('click', openCourseModal);
            coursesList.appendChild(addCourseBtn);
        }
    }

    // Render courses list
    function renderCoursesList() {
        coursesList.innerHTML = '';

        coursesData.forEach(course => {
            const courseItem = document.createElement('div');
            courseItem.className = 'course-item';

            courseItem.innerHTML = `
                <div class="course-header">
                    <span class="course-name">${course.name}</span>
                    <span class="course-percent">${course.progress}%</span>
                </div>
                <div class="course-progress">
                    <div class="course-progress-fill" style="width: ${course.progress}%"></div>
                </div>
                <div class="course-actions">
                    <span>Прогресс курса</span>
                    <button class="course-edit-btn" data-id="${course.id}">
                        Редактировать
                    </button>
                </div>
            `;

            coursesList.appendChild(courseItem);
        });

        // Add "Add Course" button
        const addCourseBtn = document.createElement('button');
        addCourseBtn.className = 'btn btn-outline';
        addCourseBtn.textContent = '➕ Добавить курс';
        addCourseBtn.addEventListener('click', openCourseModal);
        coursesList.appendChild(addCourseBtn);

        // Add event listeners to edit buttons
        document.querySelectorAll('.course-edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const courseId = parseInt(this.getAttribute('data-id'));
                const course = coursesData.find(c => c.id === courseId);
                
                if (course) {
                    document.getElementById('courseName').value = course.name;
                    courseProgress.value = course.progress;
                    progressValue.textContent = course.progress + '%';
                    
                    // Update save button to handle edit
                    saveCourse.textContent = 'Обновить курс';
                    saveCourse.onclick = function() {
                        updateCourse(courseId);
                    };
                    
                    courseModal.classList.add('active');
                }
            });
        });
    }

    // Update course
    function updateCourse(courseId) {
        const name = document.getElementById('courseName').value;
        const progress = parseInt(courseProgress.value);

        if (name) {
            const courseIndex = coursesData.findIndex(c => c.id === courseId);
            if (courseIndex !== -1) {
                coursesData[courseIndex].name = name;
                coursesData[courseIndex].progress = progress;
                
                localStorage.setItem('diaryCourses', JSON.stringify(coursesData));
                renderCoursesList();
                closeCourseModalFunc();
                
                // Reset save button to normal
                saveCourse.textContent = 'Сохранить курс';
                saveCourse.onclick = function() {
                    saveCourse.click();
                };
            }
        } else {
            alert('Пожалуйста, введите название курса');
        }
    }

    // Helper function to get month name
    function getMonthName(monthIndex) {
        const months = [
            'янв', 'фев', 'мар', 'апр', 'май', 'июн',
            'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
        ];
        return months[monthIndex];
    }

    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target === progressModal) {
            closeProgressModalFunc();
        }
        if (e.target === courseModal) {
            closeCourseModalFunc();
            // Reset save button to normal
            saveCourse.textContent = 'Сохранить курс';
            saveCourse.onclick = function() {
                saveCourse.click();
            };
        }
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const isVisible = navList.style.display === 'flex';
            navList.style.display = isVisible ? 'none' : 'flex';
            
            if (!isVisible) {
                navList.style.flexDirection = 'column';
                navList.style.position = 'absolute';
                navList.style.top = '100%';
                navList.style.left = '0';
                navList.style.right = '0';
                navList.style.background = 'var(--background)';
                navList.style.padding = '1rem';
                navList.style.boxShadow = 'var(--shadow-lg)';
                navList.style.gap = '1rem';
            }
        });
    }

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.progress-item, .course-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});