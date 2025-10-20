document.addEventListener('DOMContentLoaded', function() {
    
    const projectsData = {
        1: {
            title: "Личный сайт",
            category: "HTML, CSS",
            date: "2025-10-04",
            description: "Полностью адаптивный веб-сайт, разработанный с использованием современных технологий HTML5 и CSS3. Сайт оптимизирован для всех устройств и включает анимации, интерактивные элементы и семантическую разметку.",
            features: [
                "Адаптивный дизайн для всех устройств",
                "Современный интерфейс с анимациями",
                "Оптимизация производительности",
                "Семантическая HTML разметка",
                "Доступность (WCAG)"
            ],
            liveLink: "https://example.com/project1",
            sourceLink: "https://github.com/username/project1",
            images: ["fns_1.jpg",]
        },
        2: {
            title: "Todo-приложение",
            category: "JavaScript",
            date: "2025-09-20",
            description: "Интерактивное приложение для управления задачами с возможностью добавления, редактирования, удаления и отметки выполненных задач. Данные сохраняются в локальном хранилище браузера.",
            features: [
                "Добавление и удаление задач",
                "Отметка выполненных задач",
                "Локальное хранение данных",
                "Фильтрация задач",
                "Адаптивный интерфейс"
            ],
            liveLink: "https://example.com/project2",
            sourceLink: "https://github.com/username/project2",
            images: ["sample-todo-app.png", ]
        },
        3: {
            title: "Интернет-магазин",
            category: "React",
            date: "2025-08-15",
            description: "Полнофункциональный интернет-магазин с системой корзины покупок, оформления заказов и управления товарами. Разработан на React с использованием современных хуков и контекста.",
            features: [
                "Система корзины покупок",
                "Оформление заказов",
                "Фильтрация товаров",
                "Поиск по каталогу",
                "Адаптивный дизайн"
            ],
            liveLink: "https://example.com/project3",
            sourceLink: "https://github.com/username/project3",
            images: ["c67ee31b0898a987bcbce5a2086ec2db.jpg"]
        },
        4: {
            title: "Портфолио",
            category: "Bootstrap",
            date: "2025-07-10",
            description: "Современное портфолио-сайт, созданное с использованием Bootstrap 5. Включает адаптивную сетку, компоненты Bootstrap и кастомные стили.",
            features: [
                "Фреймворк Bootstrap 5",
                "Адаптивная сетка",
                "Компоненты Bootstrap",
                "Оптимизация загрузки",
                "Кроссбраузерная совместимость"
            ],
            liveLink: "https://example.com/project4",
            sourceLink: "https://github.com/username/project4",
            images: ["41a95a177155071.64d18b45f1484.png"]
        },
        5: {
            title: "Погодное приложение",
            category: "JavaScript",
            date: "2025-06-25",
            description: "Приложение для просмотра текущей погоды и прогноза на несколько дней. Использует открытое API погоды и геолокацию браузера.",
            features: [
                "Поиск по городам",
                "Геолокация",
                "Прогноз на 5 дней",
                "Анимации погоды",
                "Темный/светлый режим"
            ],
            liveLink: "https://example.com/project5",
            sourceLink: "https://github.com/username/project5",
            images: ["1693c1159858995.63a763a7132cd.jpg"]
        },
        6: {
            title: "Чат приложение",
            category: "React",
            date: "2025-05-18",
            description: "Real-time чат приложение с комнатами, приватными сообщениями и уведомлениями. Использует WebSocket для мгновенной передачи сообщений.",
            features: [
                "Real-time сообщения",
                "Создание комнат",
                "Приватные сообщения",
                "Уведомления",
                "История чата"
            ],
            liveLink: "https://example.com/project6",
            sourceLink: "https://github.com/username/project6",
            images: ["чат.jpg"]
        }
    };

    
    const projectModal = document.getElementById('projectModal');
    const closeProjectModal = document.getElementById('closeProjectModal');
    const modalTitle = document.getElementById('modalProjectTitle');
    const modalCategory = document.getElementById('modalProjectCategory');
    const modalDate = document.getElementById('modalProjectDate');
    const modalDescription = document.getElementById('modalProjectDescription');
    const modalFeatures = document.getElementById('modalProjectFeatures');
    const modalLiveLink = document.getElementById('modalLiveLink');
    const modalSourceLink = document.getElementById('modalSourceLink');
    const modalMainImage = document.getElementById('modalMainImage');

    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-full');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            
            filterBtns.forEach(b => b.classList.remove('active'));
            
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    
    const viewDetailsBtns = document.querySelectorAll('.btn-view-details');
    
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectsData[projectId];
            
            if (project) {
                
                modalTitle.textContent = project.title;
                modalCategory.textContent = project.category;
                modalDate.textContent = project.date;
                modalDescription.textContent = project.description;
                
                
                modalFeatures.innerHTML = '';
                project.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    modalFeatures.appendChild(li);
                });
                
                
                modalLiveLink.href = project.liveLink;
                modalSourceLink.href = project.sourceLink;
                
                
                modalMainImage.src = `../images/${project.images[0]}`;
                modalMainImage.alt = project.title;
                
                
                projectModal.classList.add('active');
            }
        });
    });

    
    function closeProjectModalFunc() {
        projectModal.classList.remove('active');
    }

    closeProjectModal.addEventListener('click', closeProjectModalFunc);

    
    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModalFunc();
        }
    });

    
    document.addEventListener('click', function(e) {
        if (e.target.closest('.thumbnail')) {
            const thumbnail = e.target.closest('.thumbnail');
            const imageIndex = thumbnail.getAttribute('data-image');
            
            
            document.querySelectorAll('.thumbnail').forEach(t => {
                t.classList.remove('active');
            });
            
            
            thumbnail.classList.add('active');
            
            
        }
    });

  
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

    
    document.querySelectorAll('.project-card-full').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});