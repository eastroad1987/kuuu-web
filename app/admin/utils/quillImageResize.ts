// This module adds image resizing functionality to Quill editor
// Based on quill-image-resize-module with TypeScript support

interface ResizeOptions {
  modules?: string[];
  overlayStyles?: Record<string, string>;
  handleStyles?: Record<string, string>;
  displaySize?: boolean;
  handleColor?: string;
  toolbarButtons?: boolean; // Show toolbar buttons for image sizing
  toolbarButtonsSizes?: number[]; // Predefined sizes in pixels for toolbar buttons
  toolbarButtonsStyles?: Record<string, string>; // Styles for the toolbar buttons
}

declare global {
  interface Window {
    Quill: any;
  }
}



class ImageResize {
  private quill: any;
  private options: ResizeOptions;
  private overlay: HTMLElement | null = null;
  private toolbar: HTMLElement | null = null;
  private img: HTMLImageElement | null = null;
  private dragHandles: HTMLElement[] = [];
  private dragStartX: number = 0;
  private dragStartY: number = 0;
  private dragStartWidth: number = 0;
  private dragStartHeight: number = 0;
  private currentHandle: HTMLElement | null = null;
  private defaultSizes: number[] = [100, 200, 300, 400, 500];

  constructor(quill: any, options: ResizeOptions = {}) {
    this.quill = quill;
    this.options = options;
    
    // Set default options
    if (this.options.toolbarButtons === undefined) {
      this.options.toolbarButtons = true;
    }
    
    if (this.options.toolbarButtonsSizes === undefined) {
      this.options.toolbarButtonsSizes = this.defaultSizes;
    }

    // Create the overlay for resize handles
    this.createOverlay();
    
    // Create toolbar for resizing buttons if enabled
    if (this.options.toolbarButtons) {
      this.createToolbar();
    }

    // Add event listener for image selection
    this.quill.root.addEventListener("click", this.handleClick.bind(this));
  }

  createOverlay() {
    // Create overlay container for resize handles
    this.overlay = document.createElement("div");
    this.overlay.className = "quill-image-resize-overlay";
    Object.assign(this.overlay.style, {
      position: "absolute",
      display: "none",
      border: "1px dashed #0078d4",
      cursor: "move",
      ...(this.options.overlayStyles || {}),
    });

    // Create resize handles
    const positions = ["nw", "ne", "sw", "se"];
    positions.forEach((pos) => {
      const handle = document.createElement("div");
      handle.className = `quill-resize-handle quill-resize-handle-${pos}`;
      handle.setAttribute("data-position", pos);
      Object.assign(handle.style, {
        position: "absolute",
        height: "12px",
        width: "12px",
        backgroundColor: this.options.handleColor || "#0078d4",
        border: "1px solid white",
        ...(this.options.handleStyles || {}),
      });

      // Position the handle based on its corner
      switch (pos) {
        case "nw":
          handle.style.top = "-6px";
          handle.style.left = "-6px";
          handle.style.cursor = "nwse-resize";
          break;
        case "ne":
          handle.style.top = "-6px";
          handle.style.right = "-6px";
          handle.style.cursor = "nesw-resize";
          break;
        case "sw":
          handle.style.bottom = "-6px";
          handle.style.left = "-6px";
          handle.style.cursor = "nesw-resize";
          break;
        case "se":
          handle.style.bottom = "-6px";
          handle.style.right = "-6px";
          handle.style.cursor = "nwse-resize";
          break;
      }

      handle.addEventListener("mousedown", this.handleMouseDown.bind(this));
      if (this.overlay) {
        this.overlay.appendChild(handle);
      }
      this.dragHandles.push(handle);
    });

    // Add size display if enabled
    if (this.options.displaySize) {
      const sizeInfo = document.createElement("div");
      sizeInfo.className = "quill-image-size";
      Object.assign(sizeInfo.style, {
        position: "absolute",
        bottom: "-20px",
        left: "0",
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "white",
        padding: "2px 6px",
        fontSize: "12px",
        borderRadius: "3px",
      });
      if (this.overlay) {
        this.overlay.appendChild(sizeInfo);
      }
    }

    // Append to document body
    document.body.appendChild(this.overlay);

    // Add document-wide event listeners for resize operation
    document.addEventListener("mousemove", this.handleMouseMove.bind(this));
    document.addEventListener("mouseup", this.handleMouseUp.bind(this));
  }

  // Create resize toolbar with buttons
  createToolbar() {
    // Create toolbar container
    this.toolbar = document.createElement("div");
    this.toolbar.className = "quill-image-resize-toolbar";
    Object.assign(this.toolbar.style, {
      position: "absolute",
      display: "none",
      flexDirection: "row",
      gap: "5px",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      borderRadius: "3px",
      padding: "5px",
      zIndex: "100",
      ...(this.options.toolbarButtonsStyles || {}),
    });
    
    // Add size buttons
    const sizes = this.options.toolbarButtonsSizes || this.defaultSizes;
    sizes.forEach(size => {
      const button = document.createElement("button");
      button.className = "quill-image-resize-button";
      button.textContent = `${size}px`;
      Object.assign(button.style, {
        backgroundColor: "#0078d4",
        color: "white",
        border: "none",
        borderRadius: "3px",
        padding: "4px 8px",
        fontSize: "12px",
        cursor: "pointer",
      });
      
      button.addEventListener("click", () => this.resizeImageTo(size));
      if (this.toolbar) {
        this.toolbar.appendChild(button);
      }
    });
    
    // Add alignment buttons
    this.addAlignmentButton("left", "⟵");
    this.addAlignmentButton("center", "↔");
    this.addAlignmentButton("right", "⟶");
    
    // Add to document
    document.body.appendChild(this.toolbar);
  }
  
  // Add alignment button to toolbar
  addAlignmentButton(alignment: string, icon: string) {
    if (!this.toolbar) return;
    
    const button = document.createElement("button");
    button.className = `quill-image-align-${alignment}-button`;
    button.textContent = icon;
    button.title = `Align ${alignment}`;
    Object.assign(button.style, {
      backgroundColor: "#333",
      color: "white",
      border: "none",
      borderRadius: "3px",
      padding: "4px 8px",
      fontSize: "12px",
      cursor: "pointer",
    });
    
    button.addEventListener("click", () => this.alignImage(alignment));
    if (this.toolbar) {
      this.toolbar.appendChild(button);
    }
  }

  handleClick(e: MouseEvent) {
    if (
      e.target instanceof HTMLImageElement &&
      e.target.parentElement === this.quill.root
    ) {
      // User clicked on an image
      this.showOverlay(e.target);
    } else if (
      this.img &&
      this.overlay &&
      !this.overlay.contains(e.target as Node)
    ) {
      // User clicked outside, hide overlay
      this.hideOverlay();
    }
  }

  showOverlay(img: HTMLImageElement) {
    this.img = img;

    // Calculate position
    const imgRect = img.getBoundingClientRect();
    const containerRect = this.quill.root.getBoundingClientRect();

    // Position overlay
    if (this.overlay) {
      this.overlay.style.display = "block";
      this.overlay.style.left = `${imgRect.left - containerRect.left + this.quill.root.scrollLeft}px`;
      this.overlay.style.top = `${imgRect.top - containerRect.top + this.quill.root.scrollTop}px`;
      this.overlay.style.width = `${imgRect.width}px`;
      this.overlay.style.height = `${imgRect.height}px`;

      // Update size display if enabled
      if (this.options.displaySize) {
        const sizeDisplay = this.overlay.querySelector(".quill-image-size");
        if (sizeDisplay) {
          sizeDisplay.textContent = `${Math.round(imgRect.width)} × ${Math.round(imgRect.height)}`;
        }
      }

      // Make the overlay a drop target for repositioning
      this.overlay.addEventListener(
        "mousedown",
        this.handleDragStart.bind(this),
      );
    }
    
    // Show toolbar if enabled
    if (this.toolbar && this.options.toolbarButtons) {
      // Position toolbar above the image
      this.toolbar.style.display = "flex";
      this.toolbar.style.left = `${imgRect.left - containerRect.left + this.quill.root.scrollLeft}px`;
      this.toolbar.style.top = `${imgRect.top - containerRect.top + this.quill.root.scrollTop - 40}px`;
    }
  }

  hideOverlay() {
    if (this.overlay) {
      this.overlay.style.display = "none";
    }
    
    // Hide toolbar if enabled
    if (this.toolbar) {
      this.toolbar.style.display = "none";
    }
    
    this.img = null;
  }

  handleMouseDown(e: MouseEvent) {
    if (!this.img) return;

    e.preventDefault();
    e.stopPropagation();

    this.currentHandle = e.target as HTMLElement;
    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;
    this.dragStartWidth = this.img.width;
    this.dragStartHeight = this.img.height;
  }

  handleDragStart(e: MouseEvent) {
    if (!this.img || this.dragHandles.includes(e.target as HTMLElement)) return;

    e.preventDefault();

    // Start dragging the image for repositioning
    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;

    // We'll use this to track the drag operation
    this.currentHandle = this.overlay;
  }

  handleMouseMove(e: MouseEvent) {
    if (!this.currentHandle || !this.img) return;

    e.preventDefault();

    if (this.dragHandles.includes(this.currentHandle)) {
      // Resizing the image
      const deltaX = e.clientX - this.dragStartX;
      const deltaY = e.clientY - this.dragStartY;

      const position = this.currentHandle.getAttribute("data-position");
      let newWidth = this.dragStartWidth;
      let newHeight = this.dragStartHeight;

      // Adjust dimensions based on handle position
      switch (position) {
        case "nw":
          newWidth = this.dragStartWidth - deltaX;
          newHeight = this.dragStartHeight - deltaY;
          break;
        case "ne":
          newWidth = this.dragStartWidth + deltaX;
          newHeight = this.dragStartHeight - deltaY;
          break;
        case "sw":
          newWidth = this.dragStartWidth - deltaX;
          newHeight = this.dragStartHeight + deltaY;
          break;
        case "se":
          newWidth = this.dragStartWidth + deltaX;
          newHeight = this.dragStartHeight + deltaY;
          break;
      }

      // Maintain aspect ratio if shift key is pressed
      if (e.shiftKey) {
        const aspect = this.dragStartWidth / this.dragStartHeight;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          newHeight = newWidth / aspect;
        } else {
          newWidth = newHeight * aspect;
        }
      }

      // Apply minimum size
      newWidth = Math.max(30, newWidth);
      newHeight = Math.max(30, newHeight);

      // Update image and overlay size
      this.img.width = newWidth;
      this.img.height = newHeight;
      this.img.style.width = `${newWidth}px`;
      this.img.style.height = `${newHeight}px`;

      if (this.overlay) {
        this.overlay.style.width = `${newWidth}px`;
        this.overlay.style.height = `${newHeight}px`;

        // Update size display if enabled
        if (this.options.displaySize) {
          const sizeDisplay = this.overlay.querySelector(".quill-image-size");
          if (sizeDisplay) {
            sizeDisplay.textContent = `${Math.round(newWidth)} × ${Math.round(newHeight)}`;
          }
        }
      }
    }
  }

  handleMouseUp() {
    this.currentHandle = null;

    // Update the Quill editor's contents to reflect the resize
    if (this.img) {
      this.updateQuillContents();
    }
  }
  
  // Resize image to specific width
  resizeImageTo(width: number) {
    if (!this.img) return;
    
    const originalWidth = this.img.width;
    const originalHeight = this.img.height;
    const aspectRatio = originalWidth / originalHeight;
    
    // Calculate new height maintaining aspect ratio
    const newHeight = width / aspectRatio;
    
    // Update image size
    this.img.width = width;
    this.img.height = newHeight;
    this.img.style.width = `${width}px`;
    this.img.style.height = `${newHeight}px`;
    
    // Update overlay
    if (this.overlay) {
      this.overlay.style.width = `${width}px`;
      this.overlay.style.height = `${newHeight}px`;
      
      // Update size display
      if (this.options.displaySize) {
        const sizeDisplay = this.overlay.querySelector(".quill-image-size");
        if (sizeDisplay) {
          sizeDisplay.textContent = `${Math.round(width)} × ${Math.round(newHeight)}`;
        }
      }
    }
    
    // Update the editor contents
    this.updateQuillContents();
  }
  
  // Align image within editor
  alignImage(alignment: string) {
    if (!this.img) return;
    
    // Remove any existing alignment classes
    this.img.classList.remove("ql-align-left", "ql-align-center", "ql-align-right");
    
    // Add the selected alignment class
    this.img.classList.add(`ql-align-${alignment}`);
    
    // Set inline styles for alignment
    switch (alignment) {
      case "left":
        this.img.style.display = "inline-block";
        this.img.style.float = "left";
        this.img.style.marginRight = "10px";
        this.img.style.marginLeft = "0";
        break;
      case "center":
        this.img.style.display = "block";
        this.img.style.float = "none";
        this.img.style.marginLeft = "auto";
        this.img.style.marginRight = "auto";
        break;
      case "right":
        this.img.style.display = "inline-block";
        this.img.style.float = "right";
        this.img.style.marginLeft = "10px";
        this.img.style.marginRight = "0";
        break;
    }
    
    // Update the editor contents
    this.updateQuillContents();
  }
  
  // Update Quill contents to reflect image changes
  updateQuillContents() {
    if (!this.img) return;
    
    try {
      const index = this.quill.getIndex(
        this.quill.getLeaf(
          Array.from(this.quill.root.childNodes).indexOf(this.img),
        )[0],
      );
      
      this.quill.updateContents(
        new this.quill.constructor.Clipboard([]).convert({
          html: this.img.outerHTML,
          text: "",
        }),
      );
    } catch (error) {
      console.error("Error updating Quill contents:", error);
    }
  }
}

// Export the module
export default ImageResize;
