// Elderly Computer Skills Game - JavaScript with jQuery

$(document).ready(function() {
    console.log('jQuery loaded, game initializing...');
    
    // Game State
    let currentLevel = 0;
    let completedLevels = new Set();
    let gameTimer = null;
    let timeLeft = 0;
    let gameStarted = false;
    let draggedFiles = new Set();
    let copiedFiles = new Set();

    // Level configurations
    const levelConfigs = {
        1: { type: 'copy-paste', duration: 60, phrase: 'Hello World' },
        2: { type: 'copy-paste', duration: 30, phrase: 'Good Morning' },
        3: { type: 'copy-paste', duration: 15, phrase: 'Thank You' },
        4: { type: 'drag-drop', duration: 30, files: 10 },
        5: { type: 'drag-drop', duration: 15, files: 10 },
        6: { type: 'file-copy', duration: 30, files: 8 }
    };

    // Video URLs (placeholders)
    const videoUrls = {
        1: 'https://youtu.be/QW8wNjq0B0I',
        2: 'https://youtu.be/_kxR4tb4LUg', 
        3: 'https://youtu.be/nVGl5qBsaGc',
        4: 'https://youtu.be/EdzL9dgzWEg',
        5: 'https://youtu.be/zFfg7iYb1BA',
        6: 'https://youtu.be/DfGgL3VocCY'
    };

    // Tips for each level type
    const levelTips = {
        'copy-paste': [
            '• Select text by clicking and dragging',
            '• Use Ctrl+C to copy, Ctrl+V to paste',
            '• Practice makes perfect!'
        ],
        'drag-drop': [
            '• Click and HOLD the mouse button',
            '• Move the mouse while holding',
            '• Release when over the target'
        ],
        'file-copy': [
            '• Right-click means use the RIGHT mouse button',
            '• Copy files first, then paste in folder',
            '• Watch for the green checkmark!'
        ]
    };

    // Phrases for copy-paste levels
    const phrases = ['Hello World', 'Good Morning', 'Thank You', 'How are you', 'Have a nice day'];

    // File names for drag-drop and file-copy levels
    const fileNames = [
        'Letter.txt', 'Photo.jpg', 'Recipe.doc', 'Notes.txt', 'Budget.xls',
        'Song.mp3', 'Video.mp4', 'Address.txt', 'List.doc', 'Memo.txt'
    ];

    // Initialize the game
    function initGame() {
        loadCompletedLevels();
        updateLevelDisplay();
        bindEvents();
    }

    // Load completed levels from localStorage
    function loadCompletedLevels() {
        const saved = localStorage.getItem('elderlyGameCompletedLevels');
        if (saved) {
            completedLevels = new Set(JSON.parse(saved));
        }
    }

    // Save completed levels to localStorage
    function saveCompletedLevels() {
        localStorage.setItem('elderlyGameCompletedLevels', JSON.stringify([...completedLevels]));
    }

    // Update level display with completion status
    function updateLevelDisplay() {
        $('.level-card').each(function() {
            const level = parseInt($(this).data('level'));
            const isCompleted = completedLevels.has(level);
            
            if (isCompleted) {
                $(this).addClass('completed');
                $(this).find('.completed-icon').show();
                $(this).find('.completed-badge').show();
                $(this).find('.level-button').text('Play Again');
            } else {
                $(this).removeClass('completed');
                $(this).find('.completed-icon').hide();
                $(this).find('.completed-badge').hide();
                $(this).find('.level-button').text('Start Level');
            }
        });
    }

    // Bind event handlers
    function bindEvents() {
        // Level selection
        $('.level-card').on('click', function() {
            const level = parseInt($(this).data('level'));
            console.log('Level card clicked:', level);
            startLevel(level);
        });

        // Back to menu
        $('#back-to-menu').on('click', backToMenu);
        $('#back-to-menu-fail').on('click', backToMenu);

        // Tutorial navigation
        $('#next-to-video').on('click', showVideoTutorial);
        $('#back-to-text').on('click', showTextTutorial);
        $('#start-game').on('click', function() {
            console.log('Start game button clicked');
            startGame();
        });

        // Copy-paste input handling
        $(document).on('input', '.paste-input', handlePasteInput);

        // Drag and drop events
        $(document).on('dragstart', '.file-item', handleDragStart);
        $(document).on('dragover', '#drop-zone', handleDragOver);
        $(document).on('drop', '#drop-zone', handleDrop);

        // File copy events
        $(document).on('contextmenu', '.file-item', handleFileRightClick);
        $(document).on('contextmenu', '#backup-folder', handleFolderRightClick);

        // Game over buttons
        $('#continue-button').on('click', continueToNextLevel);
        $('#play-again-button').on('click', restartLevel);
        $('#try-again-button').on('click', restartLevel);
    }

    // Start a level
    function startLevel(level) {
        currentLevel = level;
        const config = levelConfigs[level];
        
        // Show tutorial first
        showTutorial(config.type);
    }

    // Show tutorial
    function showTutorial(type) {
        // Hide all tutorial sections
        $('.tutorial-section').hide();
        
        // Show appropriate tutorial
        if (type === 'copy-paste') {
            $('#copy-paste-tutorial').show();
        } else if (type === 'drag-drop') {
            $('#drag-drop-tutorial').show();
        } else if (type === 'file-copy') {
            $('#file-copy-tutorial').show();
        }
        
        $('#level-select').removeClass('active');
        $('#tutorial').addClass('active');
    }

    // Show video tutorial
    function showVideoTutorial() {
        console.log('Showing video tutorial for level:', currentLevel);
        const config = levelConfigs[currentLevel];
        const videoUrl = videoUrls[currentLevel];
        
        // Update video title
        $('#video-title').text(`Video Tutorial - Level ${currentLevel}`);
        
        // Update URL display
        $('.url-text').text(`Current: ${videoUrl}`);
        
        // Show placeholder or iframe
        if (videoUrl.includes('YOUR_YOUTUBE_URL')) {
            $('#video-placeholder').show();
            $('#video-iframe').hide();
        } else {
            $('#video-placeholder').hide();
            $('#video-iframe').show();
            const embedUrl = convertToEmbedUrl(videoUrl);
            $('#video-iframe iframe').attr('src', embedUrl);
        }
        
        // Update tips
        const tips = levelTips[config.type];
        $('#tips-list').empty();
        tips.forEach(tip => {
            $('#tips-list').append(`<li>${tip}</li>`);
        });
        
        $('#tutorial').removeClass('active');
        $('#video-tutorial').addClass('active');
        console.log('Video tutorial screen activated');
    }

    // Show text tutorial
    function showTextTutorial() {
        $('#video-tutorial').removeClass('active');
        $('#tutorial').addClass('active');
    }

    // Convert YouTube URL to embed URL
    function convertToEmbedUrl(url) {
        if (url.includes('embed')) {
            return url;
        }
        
        const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
        if (videoIdMatch && videoIdMatch[1]) {
            return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
        }
        
        return url;
    }

    // Start the actual game
    function startGame() {
        console.log('Start game clicked for level:', currentLevel);
        const config = levelConfigs[currentLevel];
        
        // Setup game screen
        setupGameScreen(config);
        
        // Hide video tutorial, show game
        $('#video-tutorial').removeClass('active');
        $('#game-screen').addClass('active');
        
        // Start timer
        startTimer(config.duration);
    }

    // Setup game screen based on level type
    function setupGameScreen(config) {
        // Update title
        $('#game-title').text(`Level ${currentLevel}: ${getLevelTitle(currentLevel)}`);
        
        // Hide all game types
        $('#copy-paste-game, #drag-drop-game, #file-copy-game').hide();
        
        if (config.type === 'copy-paste') {
            setupCopyPasteGame(config);
        } else if (config.type === 'drag-drop') {
            setupDragDropGame(config);
        } else if (config.type === 'file-copy') {
            setupFileCopyGame(config);
        }
    }

    // Setup copy-paste game
    function setupCopyPasteGame(config) {
        $('#copy-paste-game').show();
        $('#source-text').text(config.phrase);
        
        // Clear all inputs
        $('.paste-input').val('').removeClass('correct incorrect');
    }

    // Setup drag-drop game
    function setupDragDropGame(config) {
        $('#drag-drop-game').show();
        draggedFiles.clear();
        
        // Generate files
        generateFiles(config.files, '#files-grid');
        
        // Reset drop zone
        $('#drop-zone').removeClass('drag-over');
        $('#file-count').text('0');
        $('#success-message').hide();
    }

    // Setup file-copy game
    function setupFileCopyGame(config) {
        $('#file-copy-game').show();
        copiedFiles.clear();
        
        // Generate files
        generateFiles(config.files, '#file-copy-grid');
        
        // Reset backup folder
        $('#backup-count').text('0');
        $('#backup-success').hide();
    }

    // Generate file items
    function generateFiles(count, container) {
        $(container).empty();
        
        for (let i = 0; i < count; i++) {
            const fileName = fileNames[i % fileNames.length];
            const fileItem = $(`
                <div class="file-item" data-file="${fileName}" draggable="true">
                    <div class="file-icon">📄</div>
                    <div class="file-name">${fileName}</div>
                </div>
            `);
            $(container).append(fileItem);
        }
    }

    // Handle paste input
    function handlePasteInput(e) {
        const input = $(e.target);
        const index = input.data('index');
        const value = input.val();
        const correctPhrase = levelConfigs[currentLevel].phrase;
        
        if (value === correctPhrase) {
            input.addClass('correct').removeClass('incorrect');
        } else if (value !== '') {
            input.addClass('incorrect').removeClass('correct');
        } else {
            input.removeClass('correct incorrect');
        }
        
        // Check if all inputs are correct
        checkCopyPasteCompletion();
    }

    // Check copy-paste completion
    function checkCopyPasteCompletion() {
        const correctPhrase = levelConfigs[currentLevel].phrase;
        const allCorrect = $('.paste-input').toArray().every(input => 
            $(input).val() === correctPhrase
        );
        
        if (allCorrect) {
            completeLevel();
        }
    }

    // Handle drag start
    function handleDragStart(e) {
        const fileName = $(e.target).closest('.file-item').data('file');
        e.originalEvent.dataTransfer.setData('text/plain', fileName);
        $(e.target).closest('.file-item').addClass('dragging');
    }

    // Handle drag over
    function handleDragOver(e) {
        e.preventDefault();
        $('#drop-zone').addClass('drag-over');
    }

    // Handle drop
    function handleDrop(e) {
        e.preventDefault();
        const fileName = e.originalEvent.dataTransfer.getData('text/plain');
        
        $('#drop-zone').removeClass('drag-over');
        $('.file-item').removeClass('dragging');
        
        if (!draggedFiles.has(fileName)) {
            draggedFiles.add(fileName);
            updateDropZoneStatus();
            
            // Remove the dragged file from the grid
            $(`.file-item[data-file="${fileName}"]`).remove();
            
            // Check completion
            if (draggedFiles.size === levelConfigs[currentLevel].files) {
                completeLevel();
            }
        }
    }

    // Update drop zone status
    function updateDropZoneStatus() {
        $('#file-count').text(draggedFiles.size);
        $('#dropped-count').text(draggedFiles.size);
        $('#success-message').show();
    }

    // Handle file right click
    function handleFileRightClick(e) {
        e.preventDefault();
        const fileName = $(e.target).closest('.file-item').data('file');
        
        // Show context menu
        showContextMenu(e, 'file', fileName);
    }

    // Handle folder right click
    function handleFolderRightClick(e) {
        e.preventDefault();
        
        // Show context menu
        showContextMenu(e, 'folder', null);
    }

    // Show context menu
    function showContextMenu(e, type, fileName) {
        // Remove existing context menu
        $('.context-menu').remove();
        
        const menu = $('<div class="context-menu"></div>');
        
        if (type === 'file') {
            menu.html(`
                <div class="menu-item" data-action="copy" data-file="${fileName}">
                    📋 Copy
                </div>
            `);
        } else if (type === 'folder') {
            if (copiedFiles.size > 0) {
                menu.html(`
                    <div class="menu-item" data-action="paste">
                        📄 Paste
                    </div>
                `);
            } else {
                menu.html(`
                    <div class="menu-item disabled">
                        📄 Paste (No files copied)
                    </div>
                `);
            }
        }
        
        // Calculate optimal position
        const menuWidth = 150; // Approximate menu width
        const menuHeight = 60; // Approximate menu height
        const viewportWidth = $(window).width();
        const viewportHeight = $(window).height();
        
        let left = e.pageX;
        let top = e.pageY;
        
        // Adjust horizontal position if menu would go off-screen
        if (left + menuWidth > viewportWidth) {
            left = e.pageX - menuWidth;
        }
        
        // Adjust vertical position if menu would go off-screen
        if (top + menuHeight > viewportHeight) {
            top = e.pageY - menuHeight;
        }
        
        // Ensure menu doesn't go off the left or top edges
        left = Math.max(10, left);
        top = Math.max(10, top);
        
        // Position menu
        menu.css({
            position: 'fixed',
            left: left + 'px',
            top: top + 'px',
            zIndex: 1000
        });
        
        $('body').append(menu);
        
        // Handle menu clicks
        menu.on('click', '.menu-item', function() {
            const action = $(this).data('action');
            const file = $(this).data('file');
            
            if (action === 'copy' && file) {
                copiedFiles.add(file);
                showCopyFeedback(file);
            } else if (action === 'paste') {
                showPasteFeedback();
                checkFileCopyCompletion();
            }
            
            menu.remove();
        });
        
        // Hide menu when clicking elsewhere
        $(document).one('click', function() {
            menu.remove();
        });
    }

    // Show copy feedback
    function showCopyFeedback(fileName) {
        const fileItem = $(`.file-item[data-file="${fileName}"]`);
        fileItem.css('background', '#dcfce7').css('border-color', '#10b981');
        
        setTimeout(() => {
            fileItem.css('background', '').css('border-color', '');
        }, 1000);
    }

    // Show paste feedback
    function showPasteFeedback() {
        $('#backup-count').text(copiedFiles.size);
        $('#backup-success').show();
        
        setTimeout(() => {
            $('#backup-success').hide();
        }, 2000);
    }

    // Check file copy completion
    function checkFileCopyCompletion() {
        if (copiedFiles.size === levelConfigs[currentLevel].files) {
            completeLevel();
        }
    }

    // Start timer
    function startTimer(duration) {
        timeLeft = duration;
        gameStarted = true;
        
        updateTimerDisplay();
        
        gameTimer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(gameTimer);
                gameOver(false);
            }
        }, 1000);
    }

    // Update timer display
    function updateTimerDisplay() {
        $('#time-left').text(timeLeft + 's');
        
        const percentage = (timeLeft / levelConfigs[currentLevel].duration) * 100;
        $('#timer-progress').css('width', percentage + '%');
        
        // Change colors based on time remaining
        if (percentage <= 10) {
            $('#time-left').addClass('danger');
            $('#timer-progress').addClass('danger');
        } else if (percentage <= 30) {
            $('#time-left').addClass('warning');
            $('#timer-progress').addClass('warning');
        } else {
            $('#time-left').removeClass('warning danger');
            $('#timer-progress').removeClass('warning danger');
        }
    }

    // Complete level
    function completeLevel() {
        clearInterval(gameTimer);
        gameStarted = false;
        
        completedLevels.add(currentLevel);
        saveCompletedLevels();
        
        showGameOver(true);
    }

    // Game over
    function gameOver(success) {
        clearInterval(gameTimer);
        gameStarted = false;
        
        showGameOver(success);
    }

    // Show game over screen
    function showGameOver(success) {
        $('#game-screen').removeClass('active');
        $('#game-over').addClass('active');
        
        if (success) {
            $('#success-screen').show();
            $('#failure-screen').hide();
            
            const nextLevel = currentLevel + 1;
            if (nextLevel <= 6) {
                $('#continue-button').text(`Continue to Level ${nextLevel}`);
            } else {
                $('#continue-button').text('Back to Menu');
            }
        } else {
            $('#success-screen').hide();
            $('#failure-screen').show();
            
            // Update failure message based on level type
            const config = levelConfigs[currentLevel];
            if (config.type === 'copy-paste') {
                $('#failure-message-text').text("Don't worry, practice makes perfect!");
            } else if (config.type === 'drag-drop') {
                $('#failure-message-text').text(`You moved ${draggedFiles.size}/${config.files} files. Try again!`);
            } else if (config.type === 'file-copy') {
                $('#failure-message-text').text(`You copied ${copiedFiles.size}/${config.files} files. Try again!`);
            }
        }
    }

    // Continue to next level
    function continueToNextLevel() {
        const nextLevel = currentLevel + 1;
        if (nextLevel <= 6) {
            startLevel(nextLevel);
        } else {
            backToMenu();
        }
    }

    // Restart current level
    function restartLevel() {
        startLevel(currentLevel);
    }

    // Back to menu
    function backToMenu() {
        clearInterval(gameTimer);
        gameStarted = false;
        
        // Hide all screens
        $('.screen').removeClass('active');
        
        // Show level select
        $('#level-select').addClass('active');
        
        // Update display
        updateLevelDisplay();
    }

    // Get level title
    function getLevelTitle(level) {
        const titles = {
            1: 'Copy & Paste Basics',
            2: 'Copy & Paste Practice', 
            3: 'Copy & Paste Expert',
            4: 'Drag & Drop Basics',
            5: 'Drag & Drop Practice',
            6: 'Copy & Paste Files'
        };
        return titles[level] || 'Unknown Level';
    }

    // Initialize the game when document is ready
    initGame();
});
